
export default async function send(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ error: 'must be a POST request' })
  }

  const {
    body: { listID, email },
  } = req

  if (!email || !listID) {
    console.warn('No email or list ID provided')
    return res
      .status(404)
      .json({ error: 'Must contain an email address and list ID' })
  }

    const url = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs';
    const body = `{"data": {"type": "profile-subscription-bulk-create-job","attributes": {"profiles": {"data": [{"type": "profile","attributes": {"subscriptions": {"email": {"marketing": {"consent": "SUBSCRIBED"}}},"email": "${email}"}}]},"historical_import": false},"relationships": {"list": {"data": {"type": "list","id": "Vwjyy7"}}}}}`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/vnd.api+json',
        revision: '2025-01-15',
        'content-type': 'application/vnd.api+json',
        Authorization: 'Klaviyo-API-Key ' + process.env.KLAVIYO_PRIVATE_KEY
      },
      body: body
    };
    
    const emailAddResponse = await fetch(url, options)
      .then(response => response.json())
      .then(json => {
        if (json.errors) {
          return res.status(500).json({ error: json.errors })
        }
        return res.status(200).json({ status: 200 })
      })
      .catch(err => 
      {
        return res.status(500).json({ error: err })
      }
      );
    return emailAddResponse
}