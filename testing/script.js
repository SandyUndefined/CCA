const url = 'https://research.iitmandi.ac.in:8000/user/login';

const data = {
  email: 'favag73544@nasskar.com',
  password: '12345678'
};

const config = {
  withCredentials: true
};

axios.post(url, data, config)
  .then(response => {
    console.log(response.data.user	);
    // Handle the response data here
  })
  .catch(error => {
    console.error(error);
    // Handle the error here
  });

async function getUserProfile() {
  try {
    const response = await axios.get("https://research.iitmandi.ac.in:8000/user/userProfile", {
      withCredentials: true
    });
    console.log(response.data);
    // Handle the response data here
  } catch (error) {
    console.error(error);
    // Handle the error here
  }
}
