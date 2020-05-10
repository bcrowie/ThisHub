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
  test("Creating 'testaccount6'", async () => {
    await axios
      .post(serverString("/users/register"), {
        Username: "testaccount6",
        Email: "testaccount6@test.com",
        Email2: "testaccount6@test.com",
        Password: "password1234",
        Password2: "password1234",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("Should login with 'testaccount6'", async () => {
    const response = await axios.post(serverString("/users/login"), {
      Email: "testaccount6@test.com",
      Password: "password1234",
    });
    auth.headers.Authorization = response.data.token;
    expect(response.data.success).toBe(true);
  });
});

describe("Testing Account routes", () => {
  test("Should get 'testaccount6'", async () => {
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
  test("Should get all Posts by 'testaccount6'", async () => {
    const response = await axios.get(
      serverString(`/users/my-account/comments`),
      auth
    );
    expect(response.status).toBe(200);
  });
  test("Should change password", async () => {
    const response = await axios.post(
      serverString(`/users/my-account/change-password`),
      { password: "NewPassword", password2: "NewPassword" },
      auth
    );
    expect(response.status).toBe(200);
  });
});

describe("Deleting 'testaccount6'", () => {
  test("Should delete user 'testaccount6'", async () => {
    await axios
      .delete(serverString("/users/testaccount6"), auth)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
