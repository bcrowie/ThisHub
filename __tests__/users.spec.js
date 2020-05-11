const axios = require("axios");

const serverString = (route) => {
  return `http://localhost:5000/users${route}`;
};

let auth = {
  headers: {
    Authorization: null,
  },
};

describe("Testing Users route", () => {
  test("Should create user 'testaccount'", async () => {
    await axios
      .post(serverString("/register"), {
        Username: "testaccount",
        Email: "testaccount@test.com",
        Email2: "testaccount@test.com",
        Password: "password1234",
        Password2: "password1234",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("Should return user 'testaccount'", async () => {
    const response = await axios.get(serverString("/testaccount"));
    expect(response.data.Username).toBe("testaccount");
  });
  test("Should be able to login with 'testaccount'", async () => {
    const response = await axios.post(serverString("/login"), {
      Email: "testaccount@test.com",
      Password: "password1234",
    });
    auth.headers.Authorization = response.data.token;
    expect(response.data.success).toBe(true);
  });
  test("Should be able to authenticate with 'testaccount'", async () => {
    const response = await axios.post(
      serverString("/auth"),
      {
        Username: "testaccount",
      },
      auth
    );
    expect(response.status).toBe(200);
    expect(response.data.Username).toBe("testaccount");
  });
  test("Should delete user 'testaccount'", async () => {
    const response = await axios.delete(serverString("/my-account"), auth);
    expect(response.status).toBe(200);
  });
  test("Should not find user 'testaccount'", async () => {
    await axios.get(serverString("/testaccount")).catch((err) => {
      expect(err.response.status).toBe(404);
    });
  });
});
