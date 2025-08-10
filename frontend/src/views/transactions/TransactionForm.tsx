import {
    Add,
    ArrowBack,
    Cancel,
    Delete,
    Save,
} from '@mui/icons-material';
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { apiService } from '../../services/api';
import { BankAccount, Customer, NominalCode, Supplier } from '../../types/accounting.d';
import { Transaction, TransactionFormData, TransactionLine } from '../../types/transactions.d';

const TransactionForm: React.FC = () => {
    const navigate = useNavigate();
    const { id, type } = useParams();
    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transactionTypes, setTransactionTypes] = useState<Transaction[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [nominalCodes, setNominalCodes] = useState<NominalCode[]>([]);

    // Sage-style colors
    const sageColors = {
        primary: '#2E7D32',
        secondary: '#1565C0',
        success: '#388E3C',
        warning: '#F9A825',
        error: '#D32F2F',
        background: '#F8F9FA',
        surface: '#FFFFFF',
    };

    const validationSchema = Yup.object({
        transaction_type: Yup.number().required('Transaction type is required'),
        description: Yup.string().required('Description is required'),
        transaction_date: Yup.date().required('Transaction date is required'),
        gross_amount: Yup.number().min(0.01, 'Amount must be greater than 0').required('Amount is required'),
        lines: Yup.array().of(
            Yup.object({
                nominal_code: Yup.number().min(1, 'Nominal code is required'),
                description: Yup.string().required('Line description is required'),
                amount: Yup.number().min(0.01, 'Line amount must be greater than 0'),
                entry_type: Yup.string().oneOf(['debit', 'credit'], 'Entry type is required')
            })
        ).min(1, 'At least one transaction line is required'),
    });

    // Map URL type parameter to transaction type ID using database data
    const getTransactionTypeByUrl = (urlType?: string, availableTypes: Transaction[] = []): number => {
        if (!urlType || availableTypes.length === 0) {
            // Return first available type ID or 1 as fallback
            return availableTypes.length > 0 ? availableTypes[0].id : 1;
        }

        // Map URL type to database transaction type by name or code
        const typeMap: { [key: string]: string[] } = {
            'invoice': ['Sales Invoice', 'SI'],
            'purchase': ['Purchase Invoice', 'PI'],
            'payment': ['Customer Payment', 'CP'],
            'supplier-payment': ['Supplier Payment', 'SP'],
            'transfer': ['Bank Transfer', 'BT'],
            'journal': ['Journal Entry', 'JE'],
            'credit': ['Credit Note', 'CN'],
            'debit': ['Debit Note', 'DN'],
        };

        const searchTerms = typeMap[urlType] || [];

        // Find matching transaction type by name or code
        const matchingType = availableTypes.find(t =>
            searchTerms.some(term =>
                t.name.toLowerCase().includes(term.toLowerCase()) ||
                t.code.toLowerCase() === term.toLowerCase()
            )
        );

        return matchingType ? matchingType.id : (availableTypes.length > 0 ? availableTypes[0].id : 1);
    };

    const formik = useFormik<TransactionFormData>({
        initialValues: {
            transaction_type: null as any, // Will be updated after transaction types are loaded
            reference: '',
            description: '',
            gross_amount: 0,
            net_amount: 0,
            tax_amount: 0,
            transaction_date: new Date().toISOString().split('T')[0],
            due_date: '',
            customer: undefined,
            supplier: undefined,
            bank_account: undefined,
            lines: [],
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        autoLoginAndLoadData();
    }, [id, type]);

    const autoLoginAndLoadData = async () => {
        try {
            setLoading(true);

            // Check if already have token
            const existingToken = localStorage.getItem('access_token');
            if (!existingToken) {
                // Auto-login with demo credentials
                const loginResponse = await apiService.auth.login('admin@example.com', 'admin123');
                if (loginResponse.access) {
                    localStorage.setItem('access_token', loginResponse.access);
                    localStorage.setItem('refresh_token', loginResponse.refresh);
                }
            }

            // Now load form data
            await loadFormData();

            if (isEdit) {
                await loadTransaction();
            }
        } catch (err: any) {
            setError('Failed to authenticate or load form data');
            console.error('TransactionForm error:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadFormData = async () => {
        try {
            const [typesRes, customersRes, suppliersRes, bankAccountsRes, nominalCodesRes] = await Promise.all([
                apiService.transactions.getTypes(),
                apiService.customers.getAll(),
                apiService.suppliers.getAll(),
                apiService.banking.getAccounts(),
                apiService.chartOfAccounts.getNominalCodes(),
            ]);

            const loadedTypes = typesRes.results || [];
            setTransactionTypes(loadedTypes);

            // Handle different response formats - some APIs return data directly, others return paginated
            const customers = Array.isArray(customersRes) ? customersRes : (customersRes.results || []);
            const suppliers = Array.isArray(suppliersRes) ? suppliersRes : (suppliersRes.results || []);
            const bankAccounts = Array.isArray(bankAccountsRes) ? bankAccountsRes : (bankAccountsRes.results || []);

            setCustomers(customers);
            setSuppliers(suppliers);
            setBankAccounts(bankAccounts);
            setNominalCodes(Array.isArray(nominalCodesRes) ? nominalCodesRes : nominalCodesRes.results || []);

            // Initialize transaction type after loading types
            if (!isEdit && loadedTypes.length > 0) {
                const newTransactionType = getTransactionTypeByUrl(type, loadedTypes);
                formik.setFieldValue('transaction_type', newTransactionType);
            }
        } catch (err: any) {
            setError('Failed to load form data');
            throw err; // Re-throw to be caught by autoLoginAndLoadData
        }
    };

    const loadTransaction = async () => {
        if (!id) return;

        try {
            const response = await apiService.transactions.getById(Number(id));
            console.log('Load transaction response:', response);

            // Handle different response formats
            const transaction = response.data || response;

            console.log('Transaction data:', transaction);

            // Set individual field values to ensure proper change detection
            formik.setFieldValue('transaction_type', transaction.transaction_type);
            formik.setFieldValue('reference', transaction.reference || '');
            formik.setFieldValue('description', transaction.description);
            formik.setFieldValue('gross_amount', transaction.gross_amount);
            formik.setFieldValue('net_amount', transaction.net_amount);
            formik.setFieldValue('tax_amount', transaction.tax_amount);

            // Format dates properly for HTML date inputs (YYYY-MM-DD)
            const formatDateForInput = (dateStr: string) => {
                if (!dateStr) return '';
                const date = new Date(dateStr);
                return date.toISOString().split('T')[0];
            };

            formik.setFieldValue('transaction_date', formatDateForInput(transaction.transaction_date));
            formik.setFieldValue('due_date', formatDateForInput(transaction.due_date));
            formik.setFieldValue('customer', transaction.customer);
            formik.setFieldValue('supplier', transaction.supplier);
            formik.setFieldValue('bank_account', transaction.bank_account);
            formik.setFieldValue('lines', transaction.lines || []);

            // Reset form state to mark as pristine after loading
            setTimeout(() => {
                formik.setTouched({});
            }, 100);

        } catch (err: any) {
            console.error('Failed to load transaction:', err);
            console.error('Error response:', err.response?.data);
            setError('Failed to load transaction');
        }
    };

    async function handleSubmit(values: TransactionFormData) {
        try {
            setLoading(true);

            // Filter out invalid transaction lines
            const validLines = values.lines.filter(line =>
                line.nominal_code > 0 &&
                line.description.trim() !== '' &&
                line.amount > 0
            );

            const submissionData = {
                ...values,
                lines: validLines,
                // Clean up due_date - if empty string, send null
                due_date: values.due_date && values.due_date.trim() !== '' ? values.due_date : null
            };

            console.log('Submitting transaction data:', JSON.stringify(submissionData, null, 2));
            console.log('Valid lines:', validLines);
            console.log('Form values:', JSON.stringify(values, null, 2));

            if (isEdit) {
                await apiService.transactions.update(Number(id), submissionData);
            } else {
                await apiService.transactions.create(submissionData);
            }

            navigate('/transactions');
        } catch (err: any) {
            console.error('Transaction submission error:', err);
            console.error('Error response data:', err.response?.data);
            console.error('Error status:', err.response?.status);
            console.error('Full error details:', {
                message: err.message,
                status: err.response?.status,
                statusText: err.response?.statusText,
                data: err.response?.data,
                url: err.config?.url
            });

            let errorMessage = 'Failed to save transaction';
            if (err.response?.data) {
                if (typeof err.response.data === 'string') {
                    errorMessage += `: ${err.response.data}`;
                } else if (err.response.data.detail) {
                    errorMessage += `: ${err.response.data.detail}`;
                } else if (err.response.data.message) {
                    errorMessage += `: ${err.response.data.message}`;
                } else {
                    // Handle field validation errors
                    const fieldErrors = Object.entries(err.response.data)
                        .map(([field, errors]) => {
                            const errorList = Array.isArray(errors) ? errors : [errors];
                            return `${field}: ${errorList.join(', ')}`;
                        })
                        .join('; ');

                    if (fieldErrors) {
                        errorMessage += `: ${fieldErrors}`;
                    } else {
                        errorMessage += `: ${JSON.stringify(err.response.data)}`;
                    }
                }
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const addTransactionLine = () => {
        const newLine: TransactionLine = {
            line_number: formik.values.lines.length + 1,
            nominal_code: nominalCodes.length > 0 ? nominalCodes[0].id : 1, // Use first available nominal code
            description: '',
            entry_type: 'debit',
            amount: 0,
            tax_rate: 0,
            tax_amount: 0,
        };

        formik.setFieldValue('lines', [...formik.values.lines, newLine]);
    };

    const removeTransactionLine = (index: number) => {
        const updatedLines = formik.values.lines.filter((_, i) => i !== index);
        // Renumber lines
        updatedLines.forEach((line, i) => {
            line.line_number = i + 1;
        });
        formik.setFieldValue('lines', updatedLines);
        calculateTotals(updatedLines);
    };

    const updateTransactionLine = (index: number, field: keyof TransactionLine, value: any) => {
        const updatedLines = [...formik.values.lines];
        updatedLines[index] = { ...updatedLines[index], [field]: value };

        // Calculate tax amount if amount or tax rate changes
        if (field === 'amount' || field === 'tax_rate') {
            const line = updatedLines[index];
            line.tax_amount = (line.amount * line.tax_rate) / 100;
        }

        formik.setFieldValue('lines', updatedLines);
        calculateTotals(updatedLines);
    };

    const calculateTotals = (lines: TransactionLine[]) => {
        const totalNet = lines.reduce((sum, line) => sum + line.amount, 0);
        const totalTax = lines.reduce((sum, line) => sum + line.tax_amount, 0);
        const totalGross = totalNet + totalTax;

        formik.setFieldValue('net_amount', totalNet);
        formik.setFieldValue('tax_amount', totalTax);
        formik.setFieldValue('gross_amount', totalGross);
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(amount);
    };

    return (
        <Box sx={{ p: 3, bgcolor: sageColors.background, minHeight: '100vh' }}>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <IconButton onClick={() => navigate('/transactions')} sx={{ color: sageColors.primary }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#212121' }}>
                    {isEdit ? 'Edit Transaction' : 'New Transaction'}
                </Typography>
            </Stack>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <form onSubmit={formik.handleSubmit}>
                {/* Main Transaction Details */}
                <Card sx={{ mb: 3, bgcolor: sageColors.surface }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Transaction Details
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth error={formik.touched.transaction_type && Boolean(formik.errors.transaction_type)}>
                                    <InputLabel>Transaction Type</InputLabel>
                                    <Select
                                        name="transaction_type"
                                        value={formik.values.transaction_type || ''}
                                        label="Transaction Type"
                                        onChange={formik.handleChange}
                                        disabled={transactionTypes.length === 0}
                                    >
                                        {transactionTypes.map((type) => (
                                            <MenuItem key={type.id} value={type.id}>
                                                {type.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    name="reference"
                                    label="Reference"
                                    value={formik.values.reference}
                                    onChange={formik.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    name="transaction_date"
                                    label="Transaction Date"
                                    type="date"
                                    value={formik.values.transaction_date}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    error={formik.touched.transaction_date && Boolean(formik.errors.transaction_date)}
                                    helperText={formik.touched.transaction_date && formik.errors.transaction_date}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    name="due_date"
                                    label="Due Date"
                                    type="date"
                                    value={formik.values.due_date}
                                    onChange={formik.handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Autocomplete
                                    options={customers}
                                    getOptionLabel={(option) => option.account_name || ''}
                                    value={customers.find(c => c.id === formik.values.customer) || null}
                                    onChange={(_, value) => formik.setFieldValue('customer', value?.id)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Customer" />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Autocomplete
                                    options={suppliers}
                                    getOptionLabel={(option) => option.account_name || ''}
                                    value={suppliers.find(s => s.id === formik.values.supplier) || null}
                                    onChange={(_, value) => formik.setFieldValue('supplier', value?.id)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Supplier" />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Autocomplete
                                    options={bankAccounts}
                                    getOptionLabel={(option) => option.account_name || ''}
                                    value={bankAccounts.find(b => b.id === formik.values.bank_account) || null}
                                    onChange={(_, value) => formik.setFieldValue('bank_account', value?.id)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Bank Account" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Transaction Lines */}
                <Card sx={{ mb: 3, bgcolor: sageColors.surface }}>
                    <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Transaction Lines
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={addTransactionLine}
                                sx={{
                                    borderColor: sageColors.primary,
                                    color: sageColors.primary,
                                }}
                            >
                                Add Line
                            </Button>
                        </Stack>

                        {formik.values.lines.length > 0 ? (
                            <Paper sx={{ overflow: 'hidden' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: `${sageColors.primary}10` }}>
                                            <TableCell>Line</TableCell>
                                            <TableCell>Nominal Code</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Tax Rate</TableCell>
                                            <TableCell align="right">Tax Amount</TableCell>
                                            <TableCell align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {formik.values.lines.map((line, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{line.line_number}</TableCell>
                                                <TableCell>
                                                    <Autocomplete
                                                        size="small"
                                                        options={nominalCodes}
                                                        getOptionLabel={(option) => `${option.nominal_code || ''} - ${option.nominal_name || ''}`}
                                                        value={nominalCodes.find(n => n.id === line.nominal_code) || null}
                                                        onChange={(_, value) => updateTransactionLine(index, 'nominal_code', value?.id || 0)}
                                                        renderInput={(params) => (
                                                            <TextField {...params} variant="outlined" />
                                                        )}
                                                        sx={{ minWidth: 200 }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        value={line.description}
                                                        onChange={(e) => updateTransactionLine(index, 'description', e.target.value)}
                                                        sx={{ minWidth: 150 }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        size="small"
                                                        value={line.entry_type}
                                                        onChange={(e) => updateTransactionLine(index, 'entry_type', e.target.value)}
                                                    >
                                                        <MenuItem value="debit">Debit</MenuItem>
                                                        <MenuItem value="credit">Credit</MenuItem>
                                                    </Select>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <TextField
                                                        size="small"
                                                        type="number"
                                                        value={line.amount}
                                                        onChange={(e) => updateTransactionLine(index, 'amount', Number(e.target.value))}
                                                        inputProps={{ step: 0.01, min: 0 }}
                                                        sx={{ width: 120 }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <TextField
                                                        size="small"
                                                        type="number"
                                                        value={line.tax_rate}
                                                        onChange={(e) => updateTransactionLine(index, 'tax_rate', Number(e.target.value))}
                                                        inputProps={{ step: 0.01, min: 0, max: 100 }}
                                                        sx={{ width: 80 }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    {formatCurrency(line.tax_amount)}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="Delete Line">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => removeTransactionLine(index)}
                                                            sx={{ color: sageColors.error }}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        ) : (
                            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                                <Typography variant="body2" color="text.secondary">
                                    No transaction lines added. Click "Add Line" to start.
                                </Typography>
                            </Paper>
                        )}
                    </CardContent>
                </Card>

                {/* Summary */}
                <Card sx={{ mb: 3, bgcolor: sageColors.surface }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                            Transaction Summary
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Net Amount"
                                    value={formatCurrency(formik.values.net_amount)}
                                    InputProps={{ readOnly: true }}
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Tax Amount"
                                    value={formatCurrency(formik.values.tax_amount)}
                                    InputProps={{ readOnly: true }}
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Gross Amount"
                                    value={formatCurrency(formik.values.gross_amount)}
                                    InputProps={{ readOnly: true }}
                                    variant="filled"
                                    sx={{
                                        '& .MuiFilledInput-root': {
                                            bgcolor: `${sageColors.primary}10`,
                                            fontWeight: 600,
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Debug Information (remove in production) */}
                {isEdit && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        <Typography variant="caption">
                            Debug: Form dirty: {formik.dirty ? 'Yes' : 'No'} |
                            Valid: {formik.isValid ? 'Yes' : 'No'} |
                            Errors: {Object.keys(formik.errors).length}
                        </Typography>
                    </Alert>
                )}

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={() => navigate('/transactions')}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={<Save />}
                        disabled={loading || (!formik.dirty && isEdit)}
                        sx={{
                            bgcolor: sageColors.primary,
                            '&:hover': {
                                bgcolor: sageColors.primary,
                                filter: 'brightness(0.9)',
                            },
                        }}
                        onClick={() => {
                            console.log('Save button clicked');
                            console.log('Form dirty:', formik.dirty);
                            console.log('Form valid:', formik.isValid);
                            console.log('Form values:', formik.values);
                            console.log('Form errors:', formik.errors);
                        }}
                    >
                        {loading ? 'Saving...' : (isEdit ? 'Update Transaction' : 'Save Transaction')}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default TransactionForm;
