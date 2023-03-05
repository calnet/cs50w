document.addEventListener('DOMContentLoaded', async function () {
    hide_all_views();
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#compose-submit').disabled = false;

    const user = await get_authenticated_user();

    if (user) {
        // By default, submit button is disabled
        document.querySelector('#compose-submit').disabled = true;
        document.querySelector('#compose-submit').addEventListener("click", submit_post_handler);

        // Enable button only if there is text in the input field
        document.querySelector('#compose-body').onkeyup = () => {
            if (document.querySelector('#compose-body').value.length > 0)
                document.querySelector('#compose-submit').disabled = false;
            else
                document.querySelector('#compose-submit').disabled = true;
        };

        document.querySelector('#nav-username').addEventListener('click', async (e) => {
            hide_all_views();
            await load_user_profile(user.id);
            await load_posts('user_posts', undefined, user.id);
        });

        document.querySelector('#nav-link-following').style.display = 'block';
        document.querySelector('#nav-link-following').addEventListener('click', async (e) => {
            e.preventDefault();
            hide_all_views();
            set_page_view_title('Following Users Posts');
            await load_posts('followed_users_posts');
        });
    } else {
        document.querySelector('#compose-submit').addEventListener("click", () => {
            window.location = '/login';
        });
    }

    load_posts('all_posts');
});


function hide_all_views() {
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#posts-view').style.display = 'none';
    document.querySelector('#profile-view').style.display = 'none';
    document.querySelector('#post-view').style.display = 'none';
}

function set_page_view_title(title) {
    const page_view_title = document.querySelector('#page-view-title');
    page_view_title.innerHTML = title;
}

async function load_posts(route = undefined, page = undefined, user_id = undefined) {
    let [posts, page_info] = await get_posts(route = route, page = page, id = user_id);
    page_info['route'] = route;
    page_info['user_id'] = user_id;
    const authenticated_user = await get_authenticated_user();
    const container = display_posts(posts, page_info, authenticated_user);
    if (page_info.num_pages > 1) {
        display_pagination_bar(page_info, container);
    }
}

async function load_user_profile(id) {
    const profile = await get_user_profile(id);
    const authenticated_user = await get_authenticated_user();
    const follow_status = get_follow_status(profile, authenticated_user);
    set_page_view_title('User Profile');
    display_user_profile(profile.user, authenticated_user, follow_status);
}

function get_follow_status(profile, authenticated_user) {
    if (profile.user.followed_by_count > 0) {
        for (const key in profile.followed_by) {
            if (Object.hasOwnProperty.call(profile.followed_by, key)) {
                if (key == authenticated_user.id) {
                    return true;
                }
            }
        }
        return false;
    }
    return false;
}

async function submit_post_handler(e) {
    e.preventDefault();

    const response = await submit_post();

    if (response.status = 201) {
        load_posts('all_posts');
    }
}

async function submit_post() {
    // Get submitted post data from form
    const data = {
        body: document.querySelector('#compose-body').value
    };

    // Clear form body data
    document.querySelector('#compose-body').value = "";

    // Submit Post route
    const url = '/new_post';

    // Build the request object
    const request = {
        method: 'POST',
        body: JSON.stringify(data)
    };

    // Send the mail
    const response = await fetch(url, request);

    if (response.status = 201) {
        // Receive the result
        const result = await response.json();
        // Print result to console
        console.log([data.body, result]);

        return response;
    } else {
        console.log(response.error);
        console.log('There was a problem submitting the post! Status Code: ' + response.status + ' returned.');
    }
}

async function get_authenticated_user() {
    const url = '/get_authenticated_user';

    let response = await fetch(url);

    if (response.status == 200) {
        const user = await response.json();
        return user;
    } else if (response.status == 204) {
        console.log('No authenticated users found - Response: ' + response.status + ' received');
    } else {
        console.log('An error occurred - Response: ' + response.status + ' received');
        console.log(response.error);
    }
    return;
}

function generate_route_url(route = undefined, page = undefined, id = undefined) {
    let url = `/${route}`;

    switch (route) {
        case 'all_posts':
            if (page != undefined) {
                url = `${url}?page=${page}`;
            }
            break;
        case 'followed_users_posts':
            if (page != undefined) {
                url = `${url}?page=${page}`;
            }
            break;
        case 'user_posts':
            if (page == undefined && id == undefined) {
                break;
            } else if (page != undefined && id != undefined) {
                url = `${url}?page=${page}&id=${id}`;
            } else if (page != undefined) {
                url = `${url}?page=${page}`;
            } else {
                url = `${url}?id=${id}`;
            }

            break;
        default:
            url = '/all_posts?page=1';
            break;
    }

    return url;
}


async function get_posts(route = undefined, page = undefined, id = undefined) {
    url = generate_route_url(route, page, id);

    let response = await fetch(url);

    if (response.status != 200) {
        console.log('Get ' + 'posts failed - Response: ' + response.status + ' received');
    } else {
        let [posts, page_info] = await response.json();

        console.log('Get ' + posts.length + ' posts successful - Response: ' + response.status + ' received');
        console.log(posts);
        console.log(page_info);

        return [posts, page_info];
    }
}

function generate_update_post_form(element) {
    console.log(`Element: ${element.id} / Page: ${element.dataset.page} / Post: ${element.dataset.post}`);

    const form = document.createElement('form');
    form.id = `update-post-form-${element.dataset.post}`;
    form.className = 'mb-4';

    // form_csrf = document.createElement('input');
    // form.append(form_csrf);
    // form_csrf.id = 'csrfmiddlewaretoken';
    // form_csrf.type = 'hidden';
    // form_csrf.value = 'B7AXjqPglxtZbwVrZL59SqvCpL7E1nAWrILeZRyobMID8W1gx3UqOrlC6EFDfBs2';

    form_body = document.createElement('textarea');
    form.append(form_body);
    form_body.id = `update-post-body-${element.dataset.post}`;
    form_body.value = document.querySelector(`#post-body-${element.dataset.post}`).innerHTML;
    form_body.name = `update-post-body-${element.dataset.post}`;
    form_body.className = 'form-control my-1';
    form_body.placeholder = 'Body';
    form_body.rows = 2;

    form_submit = document.createElement('input');
    form.append(form_submit);
    form_submit.id = 'update-post-submit';
    form_submit.type = 'submit';
    form_submit.className = 'btn btn-primary';
    form_submit.disabled = true;
    form_submit.value = 'Update Post';
    form_submit.dataset.post = element.dataset.post;
    form_submit.dataset.user = document.querySelector(`#post-username-${element.dataset.post}`).dataset.user;
    form_submit.dataset.page = element.dataset.page;

    form_submit.addEventListener("click", update_post);

    // By default, submit button is disabled
    form_submit.disabled = true;
    // Enable button only if there is text in the input field
    form_body.onkeyup = () => {
        if (form_body.value == document.querySelector(`#post-body-${element.dataset.post}`).innerHTML) {
            form_submit.disabled = true;
        } else if (form_body.value.length > 0) {
            form_submit.disabled = false;
        } else {
            form_submit.disabled = true;
        }
    };


    return form;
}

function update_post_handler() {
    this.removeEventListener("click", update_post_handler);

    const form = generate_update_post_form(this);

    const post_body = document.querySelector(`#post-body-${this.dataset.post}`);
    const post = post_body.parentElement;

    post.insertBefore(form, post_body);
    post_body.style.display = 'none';
};

async function update_post(e) {
    e.preventDefault();

    // Unhide the post body element
    document.querySelector(`#post-body-${this.dataset.post}`).style.display = 'block';

    // Add event listener, ready for further updates
    const element = document.querySelector(`#post-edit-${this.dataset.post}`);
    element.addEventListener("click", update_post_handler);

    const authenticated_user = await get_authenticated_user();

    // Security Check to make sure the post author is the current authenticated user
    if (authenticated_user.id === parseInt(this.dataset.user)) {
        const response = await fetch('/update_post', {
            method: 'POST',
            body: JSON.stringify({
                body: document.querySelector(`#update-post-body-${this.dataset.post}`).value,
                post: this.dataset.post,
                user: this.dataset.user
            })
        });

        const result = await response.json();

        if (response.status == 201) {
            console.log(result.message);
        } else if (response.status == 403) {
            console.log(result.warning);
            console.log('There was a problem updating the post! Status Code: ' + response.status + ' returned.');
        }

        const view_container = document.querySelector(`#posts-view`);

        if (document.querySelector('#profile-view').style.display == 'none') {
            load_posts('all_posts', view_container.dataset.page);
        } else {
            load_posts('user_posts', view_container.dataset.page, this.dataset.user);
        }
    }
    // Remove update-post-form from DOM tree
    this.parentElement.remove();
}

async function update_like_post(id) {
    const url = '/update_like_post/' + id;

    const response = await fetch(url);

    const result = await response.json();

    if (response.status == 200) {
        console.log(result.message);
    } else {
        console.log(result.message);
        console.log('There was a problem liking/unliking the post! Status Code: ' + response.status + ' returned.');
    }

    const view_container = document.querySelector(`#posts-view`);

    if (document.querySelector('#profile-view').style.display == 'none') {
        load_posts('all_posts', view_container.dataset.page);
    } else {
        const profile_view = document.querySelector('#profile-view');
        load_posts('user_posts', view_container.dataset.page, profile_view.dataset.user);
    }
}

function display_pagination_bar(page_info, view = 'posts-view') {
    const view_container = document.querySelector(`#${view}`);

    const nav_pagination = document.createElement('nav');
    nav_pagination.className = '';
    nav_pagination.ariaLabel = 'All posts results pages';

    const pagination = document.createElement('div');
    pagination.className = 'pagination justify-content-center mx-auto w-50';

    const nav_first_page_item = document.createElement('li');
    nav_first_page_item.className = 'btn btn-outline-info mb-4';
    nav_first_page_item.ariaLabel = 'First';
    nav_first_page_item.ariaHidden = true;
    nav_first_page_item.innerHTML = '&Lt;';
    nav_first_page_item.dataset.page = 1;

    pagination.append(nav_first_page_item);

    if (page_info.has_previous) {
        const previous_page_number = page_info.page_number - 1;

        const nav_previous_page_item = document.createElement('li');
        nav_previous_page_item.className = 'btn btn-outline-info mb-4';
        nav_previous_page_item.ariaLabel = 'Previous';
        nav_previous_page_item.ariaHidden = true;
        nav_previous_page_item.innerHTML = '&lt;';
        nav_previous_page_item.dataset.page = previous_page_number;

        pagination.append(nav_previous_page_item);
    }


    const page_number = page_info.page_number;

    for (let num = 1; num < (page_info.num_pages + 1); num++) {
        if (page_number == num) {
            const page_item = document.createElement('li');
            page_item.className = 'btn btn-info mb-4';
            page_item.innerHTML = num;
            page_item.dataset.page = num;

            pagination.append(page_item);

        } else if (num > (page_number - 3) && num < (page_number + 3)) {
            const page_item = document.createElement('li');
            page_item.className = 'btn btn-outline-info mb-4';
            page_item.innerHTML = num;
            page_item.dataset.page = num;

            pagination.append(page_item);
        }
    }

    if (page_info.has_next) {
        const next_page_number = page_info.page_number + 1;

        const nav_next_page_item = document.createElement('li');
        nav_next_page_item.className = 'btn btn-outline-info mb-4';
        nav_next_page_item.ariaLabel = 'Next';
        nav_next_page_item.ariaHidden = true;
        nav_next_page_item.innerHTML = '&gt;';
        nav_next_page_item.dataset.page = next_page_number;

        pagination.append(nav_next_page_item);
    }

    const nav_last_page_item = document.createElement('li');
    nav_last_page_item.className = 'btn btn-outline-info mb-4';
    nav_last_page_item.ariaLabel = 'Last';
    nav_last_page_item.ariaHidden = true;
    nav_last_page_item.innerHTML = '&Gt;';
    nav_last_page_item.dataset.page = page_info.num_pages;

    pagination.append(nav_last_page_item);
    nav_pagination.append(pagination);

    const nav_pagination_top = nav_pagination.cloneNode(true);
    nav_pagination_top.id = 'nav-pagination-top';

    const nav_pagination_bottom = nav_pagination.cloneNode(true);
    nav_pagination_bottom.id = 'nav-pagination-bottom';

    for (const node of nav_pagination_top.firstChild.children) {
        pagination_event_handler(node, page_info);
    }

    for (const node of nav_pagination_bottom.firstChild.children) {
        pagination_event_handler(node, page_info);
    }

    // view_container.prepend(nav_pagination);
    view_container.prepend(nav_pagination_top);
    view_container.append(nav_pagination_bottom);
    // view_container.append(nav_pagination);

    console.log(`Displaying Page: ${page_info.page_number} - Posts: ${page_info.start_index} to ${page_info.end_index} of ${page_info.total_posts} posts`);
    console.log('_______________________________________________________________________________________________________________');
}

function pagination_event_handler(node, page_info) {
    node.addEventListener('click', (e) => {
        e.preventDefault();
        load_posts(page_info.route, e.currentTarget.dataset.page, page_info.user_id);
    });
}

function display_posts(posts, page_info, user = undefined, view = 'posts-view') {
    const view_container = document.querySelector(`#${view}`);
    view_container.replaceChildren();
    view_container.style.display = 'block';

    if (view == 'posts-view') {
        view_container.dataset.page = page_info.page_number;
    }

    if (posts.length > 0) {
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'card mx-5 mb-2';

            const card_body = document.createElement('div');
            card_body.className = 'card-body';
            card_body.id = `user-post-${post.id}`;

            const post_user = document.createElement('h5');
            post_user.className = 'card-title fs-5 fw-medium';
            post_user.id = `post-username-${post.id}`;
            post_user.innerHTML = post.username;
            post_user.dataset.user = post.user_id;
            post_user.dataset.post = post.id;

            if (user != undefined) {
                post_user.addEventListener('click', async (e) => {
                    e.preventDefault();
                    hide_all_views();
                    await load_user_profile(post.user_id);
                    await load_posts('user_posts', undefined, post.user_id);
                });
            }

            let post_edit = document.createElement('a');
            post_edit.className = 'card-link fs-6 fw-semibold text-decoration-none';
            post_edit.id = `post-edit-${post.id}`;
            // post_edit.href = "#";
            post_edit.innerHTML = "Edit (TODO)";
            post_edit.dataset.page = page_info.page_number;
            post_edit.dataset.post = post.id;

            if (user != undefined && post.user_id === user.id) {
                post_edit.addEventListener("click", update_post_handler);
            } else {
                post_edit.style.display = 'None';
            }

            let post_body = document.createElement('p');
            post_body.className = 'card-text mb-1';
            post_body.id = `post-body-${post.id}`;
            post_body.dataset.post = post.id;
            post_body.innerHTML = post.body;

            let post_timestamp = document.createElement('h6');
            post_timestamp.className = 'card-subtitle mb-1 text-muted';
            post_timestamp.id = "post-timestamp";
            post_timestamp.innerHTML = post.timestamp;

            let post_like = document.createElement('div');
            post_like.className = 'card-subtitle mb-1 fs-5 fw-bold text-danger';
            post_like.id = `post-like-${post.id}`;
            post_like.dataset.post = post.id;
            post_like.dataset.user = user.id;
            post_like.innerHTML = "♥";

            if (user != undefined) {
                post_like.addEventListener('click', async (e) => {
                    await update_like_post(post.id);
                });
            }

            let post_likes_count = document.createElement('span');
            post_likes_count.className = 'card-subtitle ps-2 fs-6 fw-semibold text-muted';
            post_likes_count.id = "post-likes-count";
            post_likes_count.innerHTML = post.likes_count;

            let post_comments = document.createElement('h6');
            post_comments.className = 'card-subtitle mb-2 text-muted';
            post_comments.id = `post-comments-${post.id}`;
            post_comments.innerHTML = "Comment Placeholder";

            view_container.append(card);
            card.append(card_body);
            card_body.append(post_user);
            card_body.append(post_edit);
            card_body.append(post_body);
            card_body.append(post_timestamp);
            card_body.append(post_like);
            post_like.append(post_likes_count);
            card_body.append(post_comments);

        });
    } else {
        const card = document.createElement('div');
        card.className = 'card mx-5 mb-2 py-5';

        const card_body = document.createElement('h2');
        card_body.className = 'card-subtitle mx-auto';

        card_body.innerHTML = 'This user has no posts to display';

        view_container.append(card);
        card.append(card_body);
    }
    return view_container.id;
}

async function get_user_profile(id) {
    const url = '/user_profile/' + id;

    let response = await fetch(url);

    if (response.status == 200) {
        const profile = await response.json();

        profile.user.following_count = Object.keys(profile.following).length;
        profile.user.followed_by_count = Object.keys(profile.followed_by).length;
        profile.user.post_count = profile.post_count;

        console.log('Get profile for user: ' + profile.user.username + ' successful - Response: ' + response.status + ' received');
        console.log('User: ');
        console.log(profile.user);
        console.log('User Total Posts: ');
        console.log(profile.post_count);
        console.log('User Following: ');
        console.log(profile.following);
        console.log('User Followed by: ');
        console.log(profile.followed_by);

        return profile;
    } else {
        console.log('Failed to get user profile - Response: ' + response.status + ' received');
    }
}

async function follow_user_profile(id) {
    const url = '/follow_profile/' + id;

    let response = await fetch(url);

    if (response.status == 200) {
        // Receive the result
        const result = await response.json();
        // Print result to console
        console.log(result);
    } else {
        console.log('There was a problem following the profile! Status Code: ' + response.status + ' returned.');
        console.log(response.error);
    }
}

function display_user_profile(user, authenticated_user, following = false) {
    const profile_view = document.querySelector('#profile-view');
    profile_view.style.display = 'block';
    profile_view.dataset.user = user.id;

    profile_view.replaceChildren();

    const button_container = document.createElement('div');
    button_container.className = 'card mx-5 mb-2 flex-row';
    button_container.id = "profile-buttons";

    if (authenticated_user.id != user.id) {
        const button_follow = document.createElement('button');
        button_follow.className = 'btn btn-primary btn-sm m-1 text-white';
        button_follow.id = "profile-follow";
        if (following) {
            button_follow.innerHTML = 'Unfollow';
        } else {
            button_follow.innerHTML = 'Follow';
        }
        button_follow.dataset.user = user.id;
        button_follow.dataset.following = following;

        button_follow.addEventListener('click', async (e) => {
            e.preventDefault();
            // hide_all_views();
            await follow_user_profile(user.id);
            await load_user_profile(user.id);
            await load_posts('user_posts', undefined, user.id);
            // await load_user_posts(user.id);
        });

        button_container.append(button_follow);
    }

    const card = document.createElement('div');
    card.className = 'card mx-5 mb-2 flex-row';

    const profile_labels = generate_user_profile_labels(user);
    const profile_values = generate_user_profile_elements(user);

    profile_view.append(button_container);
    profile_view.append(card);
    card.append(profile_labels);
    card.append(profile_values);
}

function generate_user_profile_labels(profile) {
    let card_labels_body = document.createElement('div');
    card_labels_body.id = 'user-profile-labels';
    card_labels_body.className = 'card-body';

    for (const key in profile) {
        if (Object.hasOwnProperty.call(profile, key)) {
            let element = document.createElement('h5');
            element.id = 'profile-' + key + '-label';
            element.className = 'card-title fs-5 fw-medium';
            element.innerHTML = key;

            card_labels_body.append(element);
        }
    }
    return card_labels_body;
}

function generate_user_profile_elements(profile) {
    let card_body = document.createElement('div');
    card_body.id = 'user-profile';
    card_body.className = 'card-body';
    card_body.dataset.user = profile.id;

    for (const key in profile) {
        if (Object.hasOwnProperty.call(profile, key)) {
            let element = document.createElement('h5');
            element.id = 'profile-' + key;
            element.className = 'card-title fs-5 fw-medium';
            if (profile[key] === '' || profile[key] === null) {
                element.innerHTML = 'n/a';
            } else {
                element.innerHTML = profile[key];
            }

            card_body.append(element);
        }
    }
    return card_body;
}