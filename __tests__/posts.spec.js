const axios = require("axios");

const serverString = (route) => {
  return `http://localhost:5000${route}`;
};

let auth = {
  headers: {
    Authorization: null,
  },
};

let PostId;

describe("Adding user", () => {
  test("Creating 'testaccount3'", async () => {
    await axios
      .post(serverString("/users/register"), {
        Username: "testaccount3",
        Email: "testaccount3@test.com",
        Email2: "testaccount3@test.com",
        Password: "password1234",
        Password2: "password1234",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("Should login with 'testaccount3'", async () => {
    const response = await axios.post(serverString("/users/login"), {
      Email: "testaccount3@test.com",
      Password: "password1234",
    });
    auth.headers.Authorization = response.data.token;
    expect(response.data.success).toBe(true);
  });
});

describe("Testing Post routes", () => {
  test("Should get all posts", async () => {
    const response = await axios.get(serverString("/posts"));
    expect(response.status).toBe(200);
  });
  test("Should create new post", async () => {
    const response = await axios.post(
      serverString("/posts"),
      {
        Title: "Test title",
        Body: "This is the body for the test post",
      },
      auth
    );
    PostId = response.data.post.id;
    expect(response.status).toBe(200);
  });
  test("Should dislike new post", async () => {
    const response = await axios.post(
      serverString(`/posts/${PostId}/0`),
      {},
      auth
    );
    expect(response.status).toBe(200);
  });
  test("Should like new post", async () => {
    const response = await axios.post(
      serverString(`/posts/${PostId}/1`),
      {},
      auth
    );
    expect(response.status).toBe(200);
  });
  test("Should edit new post", async () => {
    const response = await axios.put(
      serverString(`/posts/${PostId}`),
      {
        Title: "New title here",
        Body: "This is the new body",
      },
      auth
    );
    expect(response.status).toBe(200);
  });
  test("Should delete new post", async () => {
    const response = await axios.delete(serverString(`/posts/${PostId}`), auth);
    expect(response.status).toBe(200);
  });
});

describe("Deleting 'testaccount3'", () => {
  test("Should delete user 'testaccount3'", async () => {
    await axios
      .delete(serverString("/users/testaccount3"), auth)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
