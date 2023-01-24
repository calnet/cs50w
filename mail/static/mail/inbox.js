document.addEventListener('DOMContentLoaded', function () {

	// Use buttons to toggle between views
	document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
	document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
	document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
	document.querySelector('#compose').addEventListener('click', compose_email);

	// By default, load the inbox
	load_mailbox('inbox');
});

function compose_email(data) {

	// Show compose view and hide other views
	document.querySelector('#emails-view').style.display = 'none';
	document.querySelector('#email-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'block';

	// Clear out composition fields
	document.querySelector('#compose-recipients').value = '';
	document.querySelector('#compose-subject').value = '';
	document.querySelector('#compose-body').value = '';

	// Check if reply email
	if (data instanceof Event === false) {
		const compose_view = document.querySelector('#compose-view');
		const heading = compose_view.getElementsByTagName('h3')[0];
		heading.innerHTML = 'Reply Email';

		// Populate composition fields
		document.querySelector('#compose-recipients').value = data.sender;
		
		const subject = document.querySelector('#compose-subject');
		// Prefix Subject Line
		if (data.subject.startsWith('Re: ')) {
			subject.value = data.subject;
		} else {
			subject.value = 'Re: ' + data.subject;
		}

		const body = document.querySelector('#compose-body');

		body.rows = 20;
		body.value = `On ${data.timestamp}, <${data.sender}> wrote: \n\n${data.body}`;

	}

	// Listen for form submit action
	document.querySelector('#compose-submit').addEventListener("click", function (event) {
		event.preventDefault();
		send_mail();
	});
}

function load_mailbox(mailbox) {
	// Show the mailbox and hide other views
	document.querySelector('#emails-view').style.display = 'block';
	document.querySelector('#email-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'none';

	// Show the mailbox name
	document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

	// Retrieve the list of emails for the loaded mailbox
	get_mailbox_emails(mailbox);
}

function load_email(email, mailbox) {
	// Show the email and hide other views
	document.querySelector('#email-view').style.display = 'block';
	document.querySelector('#emails-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'none';

	// Show the subject line
	document.querySelector('#email-view').innerHTML = `<h3>${email.subject}</h3>`;

	display_email(email, mailbox);

	mark_email_read(email.id);
}

function open_email(element, mailbox) {
	// Display email details
	const id = parseInt(element.id.split("data-")[1]);
	// console.log('This element has been clicked! - ' + id);
	// console.log('Display email contents!');

	get_email(id, mailbox);
}

function display_email(email, mailbox) {
	display_email_headings(email, mailbox);
	display_email_body(email, mailbox);
}

function display_email_headings(email, mailbox) {
	const email_view = document.querySelector('#email-view');

	// Construct container layout to display email
	const email_container = document.createElement('div');
	email_container.id = 'email_container';

	// Apply CSS Styles
	email_container.classList.add('border');

	email_view.appendChild(email_container);

	// const email_header_labels = [];
	const email_headers = document.createElement('div');
	email_headers.id = 'email_headers';
	email_headers.classList.add('p-2');

	// Create Email Headers
	const labels = ['From', 'To', 'Subject', 'Timestamp'];
	labels.forEach(label => {
		const email_header = document.createElement('div');
		email_header.id = 'email_header_' + label.toLowerCase();

		const email_header_label = document.createElement('span');
		email_header_label.id = 'email_header_label_' + label.toLowerCase();
		email_header_label.innerHTML = label + ': ';
		email_header.append(email_header_label);

		const email_header_data = document.createElement('span');
		email_header_data.id = 'email_header_data_' + label.toLowerCase();
		email_header.append(email_header_data);

		email_headers.append(email_header);

		// Apply CSS Styles to Header
		email_header.classList.add('email_header');
		email_header.classList.add('row');
		email_header.classList.add('p-1');
		// Apply CSS Styles to Header Label
		email_header_label.classList.add('col-2');
		email_header_label.classList.add('fw-bold');
		// Apply CSS Styles to Header Data
		email_header_data.classList.add('col-10');
	});

	email_container.append(email_headers);

	let element = document.querySelector('#email_header_from');
	element.lastChild.innerHTML = email.sender

	element = document.querySelector('#email_header_to');
	if (email.recipients.length > 0) {
		element.lastChild.innerHTML = email.recipients;
	}

	element = document.querySelector('#email_header_subject');
	element.lastChild.innerHTML = email.subject;

	element = document.querySelector('#email_header_timestamp');
	element.lastChild.innerHTML = email.timestamp;

	element = create_element('button', 'reply', 'Reply', ['btn', 'btn-sm', 'btn-outline-primary']);
	element.addEventListener('click', () => {
		const data = {
			'id': email.id,
			'sender': email.sender,
			'subject': email.subject,
			'timestamp': email.timestamp,
			'body': email.body
		};

		compose_email(data);
	});

	email_headers.append(element);

	if (mailbox === 'inbox') {
		element = create_element('button', 'archive', 'Archive', ['btn', 'btn-sm', 'btn-outline-primary']);
		element.addEventListener('click', () => {
			archive_email(email.id);
		});
	} else if (mailbox === 'archive') {
		element = create_element('button', 'archive', 'Move to Inbox', ['btn', 'btn-sm', 'btn-outline-primary']);
		element.addEventListener('click', () => {
			unarchive_email(email.id);
		});
	}

	email_headers.append(element);
}

/**
 * Creates an instance of the element for the specified tag.
 * @param tagName The name of the element.
 * @param id The id of the element.
 * @param innerHTML A string to be used as the text value for the element.
 * @param classList An array of CSS class names to be applied to the element.
 */
function create_element(tagName, id = '', innerHTML = '', classList = []) {
	const element = document.createElement(tagName);

	classList.forEach(class_name => {
		element.classList.add(class_name);
	});

	element.id = id;
	element.innerHTML = innerHTML;

	return element;
}

function display_email_body(email, mailbox) {
	const email_container = document.querySelector('#email_container');
	const email_body = document.createElement('div');
	email_body.id = 'email_body';

	// Apply CSS Styles
	email_body.classList.add('border');
	email_body.classList.add('p-3');

	email_body.innerHTML = email.body;

	email_container.append(email_body);
}

function display_mailbox_emails(emails, mailbox) {
	display_mailbox_headings(emails, mailbox);

	const mailbox_container = document.querySelector('#mailbox_container');

	const mailbox_emails = document.createElement('div')
	mailbox_emails.id = 'mailbox_emails';

	mailbox_container.append(mailbox_emails);

	emails.forEach(email => {
		// Create a list item add the email record to it
		let row = document.createElement('div');
		// row.id = 'data_';

		// Apply CSS Classes
		row.classList.add('row');
		row.id = 'mailbox-emails-data-' + email.id;

		for (const column in email) {
			if (column === (mailbox === 'sent' ? 'recipients' : 'sender') || column === 'subject' || column === 'timestamp') {
				if (Object.hasOwnProperty.call(email, column)) {
					row.appendChild(document.createElement('div'));

					row.lastChild.id = 'mailbox-emails-data-' + column + '-' + email.id;

					// Apply CSS Classes
					row.lastChild.classList.add('col');
					row.lastChild.classList.add('border');
					row.lastChild.classList.add('p-1');
					row.lastChild.classList.add('ps-3');

					// Apply CSS Class if email is read
					if (email.read) {
						row.lastChild.classList.add("bg-secondary");
						row.lastChild.classList.add("bg-opacity-25");
						row.lastChild.classList.add("border-dark-subtle");
					}

					row.lastChild.innerHTML = email[column];
					mailbox_emails.append(row);
				}
			}
		}

		row.addEventListener('click', function (e) {
			open_email(this, mailbox);
		});
	});

	// Fix borders for last row in email list
	if (mailbox_emails.childElementCount > 0) {
		for (let i = 0; i < mailbox_emails.lastChild.childElementCount; i++) {
			const element = mailbox_emails.lastChild.children[i];
			// 1st Column
			if (i === 0) {
				element.classList.add('border-bottom-left-radius-4');
			}
			// Last Column
			else if (i === mailbox_emails.lastChild.childElementCount - 1) {
				element.classList.add('border-bottom-right-radius-4');
			}
		};
	}
}

function display_mailbox_headings(emails, mailbox) {
	const emails_view = document.querySelector('#emails-view');

	// Construct container layout to display emails
	const mailbox_container = document.createElement('div');
	mailbox_container.id = 'mailbox_container';

	mailbox_container.classList.add('container');
	mailbox_container.classList.add('border');
	mailbox_container.classList.add('border-dark');
	mailbox_container.classList.add('rounded-4');
	mailbox_container.classList.add('text-start');

	emails_view.appendChild(mailbox_container);

	const mailbox_headings = document.createElement('div');
	mailbox_headings.id = 'mailbox_headings';

	mailbox_headings.classList.add('row');
	mailbox_headings.classList.add('border-bottom');
	mailbox_headings.classList.add('border-dark');

	mailbox_container.appendChild(mailbox_headings);

	// Get the field labels
	let column_names = [];

	if (emails.length > 0) {
		column_names = Object.keys(emails[0]);
	} else {
		console.log('Display ' + mailbox + ' emails successful - No records Found');
		return;
	}

	// Get header row for table
	column_names.forEach(column_name => {
		if (column_name === (mailbox === 'sent' ? 'recipients' : 'sender') || column_name === 'subject' || column_name === 'timestamp') {
			const element = document.createElement('div');
			element.id = 'mailbox_header_' + column_name;

			element.classList.add('p-2');

			column_name = column_name.charAt(0).toUpperCase() + column_name.slice(1);
			element.innerHTML = column_name;

			mailbox_headings.append(element);
		}
	});

	// Apply CSS Classes
	for (let i = 0; i < mailbox_headings.childElementCount; i++) {
		const element = mailbox_headings.children[i];

		element.classList.add('col');
		element.classList.add('fw-semibold');
		element.classList.add('fs-5');
		element.classList.add('text-center');
		element.classList.add("bg-secondary");
		element.classList.add("bg-opacity-50");

		// Fix borders for header row
		// 1st Column
		if (i === 0) {
			element.classList.add('border-top-left-radius-4');
		}
		// Last Column
		else if (i === mailbox_headings.childElementCount - 1) {
			element.classList.add('border-top-right-radius-4');
		} else {
			element.classList.add('border-start');
			element.classList.add('border-end');
			element.classList.add("border-dark");
		}
	}
}

async function get_mailbox_emails(mailbox) {
	const url = '/emails/' + mailbox;

	let response = await fetch(url);

	if (response.status == 200) {
		let emails = await response.json();
		
		display_mailbox_emails(emails, mailbox)

		console.log('Display ' + mailbox + ' emails successful - Response: ' + response.status + ' received');
	} else {
		console.log('Display ' + mailbox + ' emails failed - Response: ' + response.status + ' received');
	}
}

// function get_email(id, mailbox) {
// 	const url = '/emails/' + id;

// 	fetch(url)
// 		.then(response => response.json())
// 		.then(email => {
// 			load_email(email, mailbox);
// 		});
// }

async function get_email(id, mailbox) {
	const url = '/emails/' + id;

	let response = await fetch(url);

	if (response.status == 200) {
		let email = await response.json();

		load_email(email, mailbox);

		console.log('Load ' + mailbox + ' email id: ' + id + ' successful - Response: ' + response.status + ' received');
	} else {
		console.log('Load ' + mailbox + ' email id: ' + id + ' failed - Response: ' + response.status + ' received');
	}
}

function send_mail() {
	// Get submitted email data from form
	let recipients = document.querySelector('#compose-recipients').value.toLowerCase();
	let subject = document.querySelector('#compose-subject').value;
	let body = document.querySelector('#compose-body').value;

	// Send the mail
	fetch('/emails', {
		method: 'POST',
		body: JSON.stringify({
			recipients: recipients,
			subject: subject,
			body: body
		})
	})
		.then(response => response.json())
		.then(result => {
			// Print result
			console.log([recipients, subject, body, result]);
			// Redirect to Users Sent Mailbox
			load_mailbox('sent');
		});
}

async function update_email(id, field, value) {
	let response = await fetch('/emails/' + id,
	{
		method: 'PUT',
		body: JSON.stringify({
			[field]: value
		})
	});
	
	if (response.status = 204) {
		console.log('Update email: '+ id +' field: '+ field +' with '+ value +' was successful - Response: ' + response.status + ' received');
		return response;
	} else {
		console.log('Update email: '+ id +' field: '+ field +' with '+ value +' failed - Response: ' + response.status + ' received');
		return response;
	}
}

async function mark_email_read(id) {
	let response = await update_email(id, 'read', true)

	if (response.status = 204) {
		console.log('Mark email id: '+ id +' read was successful - Response: ' + response.status + ' received');
		// return response;
	} else {
		console.log('Mark email id: '+ id +' read failed - Response: ' + response.status + ' received');
		// return response;
	}
}

async function mark_email_unread(id) {
	let response = await update_email(id, 'read', false)

	if (response.status = 204) {
		console.log('Mark email id: '+ id +' unread was successful - Response: ' + response.status + ' received');
		// return response;
	} else {
		console.log('Mark email id: '+ id +' unread failed - Response: ' + response.status + ' received');
		// return response;
	}
}

async function archive_email(id) {
	let response = await update_email(id, 'archived', true)
	
	if (response.status = 204) {
		load_mailbox('inbox');
	}
}

async function unarchive_email(id) {
	let response = await update_email(id, 'archived', false)
	
	if (response.status = 204) {
		load_mailbox('inbox');
	}
}