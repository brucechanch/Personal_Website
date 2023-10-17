export async function addData(currentTab, formData) {
  try {
    const response = await fetch(
      `https://personal-website-54s22nt1c-as-projects-6c9300c4.vercel.app//api/${currentTab}/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )

    const result = await response.json()

    return result
  } catch (e) {
    console.log(e)
  }
}

export async function getData(currentTab) {
  try {
    const response = await fetch(
      `https://personal-website-54s22nt1c-as-projects-6c9300c4.vercel.app//api/${currentTab}/get`,
      {
        method: 'GET',
      }
    )

    const result = await response.json()

    return result
  } catch (e) {
    console.log(e)
  }
}

export async function updateData(currentTab, formData) {
  try {
    const response = await fetch(
      `https://personal-website-54s22nt1c-as-projects-6c9300c4.vercel.app//api/${currentTab}/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )

    const result = await response.json()

    return result
  } catch (e) {
    console.log(e)
  }
}

export async function login(formData) {
  try {
    const response = await fetch(
      `https://personal-website-54s22nt1c-as-projects-6c9300c4.vercel.app//api/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )

    const result = await response.json()

    return result
  } catch (e) {
    console.log(e)
  }
}
