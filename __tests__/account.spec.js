const axios = require("axios");

const serverString = (route) => {
  return `http://localhost:5000${route}`;
};

const auth = {
  headers: {
    Authorization: null,
  },
};

describe("Adding user", () => {
  test("Creating 'testaccount4'", async () => {
    await axios
      .post(serverString("/users/register"), {
        Username: "testaccount4",
        Email: "testaccount4@test.com",
        Email2: "testaccount4@test.com",
        Password: "password1234",
        Password2: "password1234",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("Should login with 'testaccount4'", async () => {
    const response = await axios.post(serverString("/users/login"), {
      Email: "testaccount4@test.com",
      Password: "password1234",
    });
    auth.headers.Authorization = response.data.token;
    expect(response.data.success).toBe(true);
  });
});

describe("Testing Account routes", () => {
  test("Should get 'testaccount4'", async () => {
    const response = await axios.get(serverString(`/users/my-account`), auth);
    expect(response.status).toBe(200);
  });
  test("Should get all liked Posts", async () => {
    const response = await axios.get(
      serverString(`/users/my-account/likes`),
      auth
    );
    expect(response.status).toBe(200);
  });
  test("Should get all disliked Posts", async () => {
    const response = await axios.get(
      serverString(`/users/my-account/dislikes`),
      auth
    );
    expect(response.status).toBe(200);
  });
  test("Should get all Posts by 'testaccount4'", async () => {
    const response = await axios.get(
      serverString(`/users/my-account/posts`),
      auth
    );
    expect(response.status).toBe(200);
  });
  // iss11 needs to be merged for this to test
  test("Should change password", async () => {
    const response = await axios.post(
      serverString(`/users/my-account/change-password`),
      {
        Old: "password1234",
        Password: "NewPassword",
        Password2: "NewPassword",
      },
      auth
    );
    expect(response.status).toBe(200);
  });
  test("Should login with new password", async () => {
    const response = await axios.post(serverString("/users/login"), {
      Email: "testaccount4@test.com",
      Password: "NewPassword",
    });
    auth.headers.Authorization = response.data.token;
    expect(response.data.success).toBe(true);
  });
});

describe("Deleting 'testaccount4'", () => {
  test("Should delete user 'testaccount4'", async () => {
    await axios.delete(serverString("/users/my-account"), auth).then((res) => {
      expect(res.status).toBe(200);
    });
  });
});
