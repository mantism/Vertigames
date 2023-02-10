export async function fetcher(url) {
  const res = await fetch(url);
  return await res.json();
}

export async function fetchGetJson(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (err) {
    return JSON.stringify(err);
  }
}

export async function fetchPostJson(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    });

    return await response.json();
  } catch (err) {
    return JSON.stringify(new Error(err.message));
  }
}