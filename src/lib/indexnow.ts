
export const INDEXNOW_KEY = '432658ab7r89324023908470293489230498239048239048';
export const INDEXNOW_HOST = 'www.countcharacters.org';

export async function submitToIndexNow(urls: string[]) {
  const body = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200 || response.status === 202) {
      console.log('IndexNow submission successful');
      return { success: true };
    } else {
      console.error('IndexNow submission failed', response.status, await response.text());
      return { success: false, status: response.status };
    }
  } catch (error) {
    console.error('IndexNow submission error', error);
    return { success: false, error };
  }
}
