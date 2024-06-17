const fetch = require('node-fetch');
const base_url = 'https://api.luarmor.net';

// API KEY MANAGEMENT 

async function get_api_status() {
    const response = await fetch(`${base_url}/status`);
    return response.json();
}

async function get_key_details(api_key) {
    const response = await fetch(`${base_url}/v3/keys/${api_key}/details`);
    return response.json();
}

async function get_key_stats(api_key) {
    const response = await fetch(`${base_url}/v3/keys/${api_key}/stats`);
    return response.json();
}

// USER & KEY MANAGEMENT

async function create_user(api_key, project_id, data) {
    if (!data) throw new Error('Data is required');

    const user_data = {
        identifier: data.identifier || null,
        key_days: data.granted_days || null, // null = never expire
        note: data.user_note || 'Not provided',
        discord_id: data.discord_id || null,
    }

    const response = await fetch(`${base_url}/v3/projects/${project_id}/users`, {
        method: 'POST',
        headers: {
            'Authorization': `${api_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_data)
    });

    return response.json();
}

async function update_user(api_key, project, data) {
    if (!data) throw new Error('Data is required');

    const user_data = {
        key_days: data.granted_days || null, // null = never expire
        note: data.user_note || 'Not provided',
        discord_id: data.discord_id || null,
        user_key: data.user_key || null
    }

    const response = await fetch(`${base_url}/v3/projects/${project_id}/users/${user_id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `${api_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_data)
    });

    return response.json();
}

async function delete_user(api_key, project_id, script_key) {
    const response = await fetch(`${base_url}/v3/projects/${project_id}/users?user_key=${script_key}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${api_key}`,
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

async function get_users(api_key, project_id) {
    const response = await fetch(`${base_url}/v3/projects/${project_id}/users`, {
        headers: {
            'Authorization': `${api_key}`,
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

async function get_user(api_key, project_id, discord_id) {
    const response = await fetch(`${base_url}/v3/projects/${project_id}/users?discord_id=${discord_id}`, {
        headers: {
            'Authorization': `${api_key}`,
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

async function reset_hwid(api_key, project_id, discord_id, forced) {
    // get script_key from get_user

    const user = get_user(api_key, project_id, discord_id);
    if (!user.users[0]) throw new Error('User not found');
    const user_data = user.users[0];    

    const response = await fetch(`${base_url}/v3/projects/${project_id}/users/resethwid`, {
        method: 'POST',
        headers: {
            'Authorization': `${api_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_key: user_data.script_key, force: forced})
    });
}

async function link_discord(api_key, project, script_key, discord_id, forced) {
    const response = await fetch(`${base_url}/v3/projects/${project_id}/users/linkdiscord`, {
        method: 'POST',
        headers: {
            'Authorization': `${api_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_key: script_key, discord_id: discord_id, force: forced})
    });
}

async function blacklist_user(api_key, project_id, script_key, reason) {
    const response = await fetch(`${base_url}/v3/projects/${project_id}/users/blacklist`, {
        method: 'PATCH',
        headers: {
            'Authorization': `${api_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_key: script_key, reason: reason})
    });
}

// EXPORT CUSTOM FUNCTIONS

module.exports = {
    get_api_status,
    get_key_details,
    get_key_stats,
    create_user,
    update_user,
    delete_user,
    get_users,
    get_user,
    reset_hwid,
    link_discord,
    blacklist_user
}
