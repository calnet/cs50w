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
	if (data instanceof Event === false)  {
		const compose_view = document.querySelector('#compose-view');
		const heading = compose_view.getElementsByTagName('h3')[0];
		heading.innerHTML = 'Reply Email';

		// Populate composition fields
		document.querySelector('#compose-recipients').value = data.sender;
		document.querySelector('#compose-subject').value = 'Re: ' + data.subject;
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

function load_email(email) {
	// Show the email and hide other views
	document.querySelector('#email-view').style.display = 'block';
	document.querySelector('#emails-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'none';

	// Show the subject line
	document.querySelector('#email-view').innerHTML = `<h3>${email.subject}</h3>`;

	display_email(email);

	// mark_email_read(email.id);
}

function open_email() {
	// Display email details
	id = parseInt(this.id.split("data-")[1]);
	console.log('This element has been clicked! - ' + this.id);
	console.log('Display email contents!');
	
	get_email(id);
}

function display_email(email) {
	display_email_headings(email);
	display_email_body(email);
}

function display_email_headings(email) {
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

	// for (let i = 0; i < email_header_labels.length; i++) {
	// 	const element = document.querySelector('#' + email_header_labels[i].id)
	// 	email_header.innerHTML = email_header_labels[i].innerHTML + ': ' + email_headers[i];
	// }
	
	// email_container.appendChild(email_headers);

	const reply = document.createElement('button');
	reply.id = 'reply';

	reply.classList.add('mt-3');
	reply.classList.add('btn');
	reply.classList.add('btn-sm');
	reply.classList.add('btn-outline-primary');

	reply.innerHTML = 'Reply';

	reply.addEventListener('click', () => {
		const data = {
			'id': email.id,
			'sender':email.sender,
			'subject':email.subject
		}
		
		compose_email(data);
	});

	email_headers.append(reply);
}

function display_email_body(email) {
	const email_container = document.querySelector('#email_container');
	const email_body = document.createElement('div');
	email_body.id = 'email_body';
	
	// Apply CSS Styles
	email_body.classList.add('border');
	email_body.classList.add('p-3');
	
	email_body.innerHTML = email.body;
	
	email_container.append(email_body);
}

function display_mailbox_emails(mailbox, emails) {
	display_mailbox_headings(mailbox, emails);
	
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
		
		row.addEventListener('click', open_email);
	});
	
	// Fix borders for last row in email list
	if (mailbox_emails.childElementCount > 0){
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

function display_mailbox_headings(mailbox, emails) {
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

function get_mailbox_emails(mailbox) {
	const url = '/emails/' + mailbox;

	fetch(url)
		.then(response => response.json())
		.then(emails => {
			display_mailbox_emails(mailbox, emails);
		});
}

function get_email(id) {
	const url = '/emails/' + id;

	fetch(url)
		.then(response => response.json())
		.then(email => {
			load_email(email);
		});
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

function update_email(id, field, value) {
	fetch('/emails/' + id, {
		method: 'PUT',
		body: JSON.stringify({
			[field]: value
		})
	})
}

function mark_email_read(id) {
	update_email(id, 'read', true)
}

function mark_email_unread(id) {
	update_email(id, 'read', false)
}

function archive_email(id) {
	update_email(id, 'archived', true)
}

function unarchive_email(id) {
	update_email(id, 'archived', false)
}