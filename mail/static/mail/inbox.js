document.addEventListener('DOMContentLoaded', function () {

	// Use buttons to toggle between views
	document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
	document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
	document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
	document.querySelector('#compose').addEventListener('click', compose_email);

	// By default, load the inbox
	load_mailbox('inbox');
});

function compose_email() {

	// Show compose view and hide other views
	document.querySelector('#emails-view').style.display = 'none';
	document.querySelector('#compose-view').style.display = 'block';

	// Clear out composition fields
	document.querySelector('#compose-recipients').value = '';
	document.querySelector('#compose-subject').value = '';
	document.querySelector('#compose-body').value = '';

	// Listen for form submit action
	document.querySelector('#compose-submit').addEventListener("click", function (event) {
		event.preventDefault();
		send_mail();
	});
}

function load_mailbox(mailbox) {

	// Show the mailbox and hide other views
	document.querySelector('#emails-view').style.display = 'block';
	document.querySelector('#compose-view').style.display = 'none';

	// Show the mailbox name
	document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

	// Retrieve the list of emails for the loaded mailbox
	get_mail(mailbox);

}

function display_emails (mailbox, emails) {
	display_email_headers (mailbox, emails);
	
	const container = document.querySelector('#container');

	emails.forEach(email => {
		// Create a list item add the email record to it
		let row = document.createElement('div');
		// row.id = 'data_';

		// Apply CSS Classes
		row.classList.add('row');
		row.classList.add('data-');
		
		for (const column in email) {
			if (column === (mailbox === 'sent' ? 'recipients' : 'sender') || column === 'subject' || column === 'timestamp') {
				if (Object.hasOwnProperty.call(email, column)) {
					row.appendChild(document.createElement('div'));

					// Apply CSS Classes
					row.lastChild.classList.add('col');
					row.lastChild.classList.add('data-' + column);
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
					container.append(row);
				}
			}
		}
	});
	
	// Fix borders for last row in email list
	for (let i = 0; i < container.lastChild.childElementCount; i++) {
		const element = container.lastChild.children[i];
		// 1st Column
		if (i === 0) {
			element.classList.add('border-bottom-left-radius-4');
		}
		// Last Column
		else if (i === container.lastChild.childElementCount - 1) {
			element.classList.add('border-bottom-right-radius-4');
		}
	};
}

function display_email_headers (mailbox, emails) {
	// Print emails
	const emails_view = document.querySelector('#emails-view');
	
	// Construct container layout to display emails
	const container = document.createElement('div');
	container.id = 'container';

	container.classList.add('container');
	container.classList.add('border');
	container.classList.add('border-dark');
	container.classList.add('rounded-4');
	container.classList.add('text-start');

	emails_view.appendChild(container);
	
	const headings = document.createElement('div');
	headings.id = 'header';

	headings.classList.add('row');
	headings.classList.add('border-bottom');
	headings.classList.add('border-dark');

	container.appendChild(headings);
	
	// Get the field labels
	let column_names = [];

	if (emails.length > 0) {
		column_names = Object.keys(emails[0]);
	}
	
	// Get header row for table
	column_names.forEach(column_name => {
		if (column_name === (mailbox === 'sent' ? 'recipients' : 'sender') || column_name === 'subject' || column_name === 'timestamp') {
			const element = document.createElement('div');
			element.id = 'header_' + column_name;
			
			element.classList.add('p-2');
			
			column_name = column_name.charAt(0).toUpperCase() + column_name.slice(1);
			element.innerHTML = column_name;
			
			headings.append(element);
		}
	});

	// Apply CSS Classes
	for (let i = 0; i < headings.childElementCount; i++) {
		const element = headings.children[i];

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
		else if (i === headings.childElementCount - 1) {
			element.classList.add('border-top-right-radius-4');
		} else {
			element.classList.add('border-start');
			element.classList.add('border-end');
			element.classList.add("border-dark");
		}
	}
}

function get_mail(mailbox) {
	const url = '/emails/' + mailbox;

	fetch(url)
		.then(response => response.json())
		.then(emails => {
			display_emails(mailbox, emails);
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