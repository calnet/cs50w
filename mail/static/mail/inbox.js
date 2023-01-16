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

function get_mail(mailbox) {
	const url = '/emails/' + mailbox;

	fetch(url)
		.then(response => response.json())
		.then(emails => {
			// Print emails
			
			const emails_view = document.querySelector('#emails-view');
			
			// Construct layout structure to display emails
			const container = document.createElement('div');
			container.setAttribute('id', 'container');
			container.setAttribute('class', 'container border rounded text-start');
			emails_view.appendChild(container);
			
			const headings = document.createElement('div');
			headings.setAttribute('id', 'header');
			headings.setAttribute('class', 'row');
			headings.setAttribute('style', 'border-bottom:medium solid;');
			// headings.setAttribute('border-bottom-width', '2px');
			container.appendChild(headings);

			let labels = [];

			if (emails.length > 0) {
				labels = Object.keys(emails[0]);
			}
			else
			{
				labels = [];
			}
			
			// Get header row for table
			labels.forEach(label => {
				if (label === (mailbox === 'sent' ? 'recipients' : 'sender') || label === 'subject' || label === 'timestamp') {
					const header = document.querySelector('#header');
					// const header = document.querySelector('th');
					let element = document.createElement('div');
					element.setAttribute('id', 'header_' + label);
					element.setAttribute('class', 'col border');
					label = label.charAt(0).toUpperCase() + label.slice(1);
					element.innerHTML = label;
					header.append(element);
				}
			});

			const parent = document.querySelector('#container');

			emails.forEach(email => {
				// Create a list item for the new mail and add the email to it
				let item = document.createElement('div');
				// item.setAttribute('id', 'data_');
				item.setAttribute('class', 'row data-');
				
				for (const key in email) {
					// console.log(email);
					if (key === (mailbox === 'sent' ? 'recipients' : 'sender') || key === 'subject' || key === 'timestamp') {
						if (Object.hasOwnProperty.call(email, key)) {
							item.appendChild(document.createElement('div'));
							item.lastChild.setAttribute('class', 'col border data-' + key);
							item.lastChild.innerHTML = email[key];
							parent.append(item);
						}
					}
				}
			});
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