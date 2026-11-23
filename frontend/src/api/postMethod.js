export const postMethod = async (url, data) => {
  console.log(url,data)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw new Error(error.message);
 }
};