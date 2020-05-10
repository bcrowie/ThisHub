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
let CommentId;
let ChildId;

describe("Adding user", () => {
  test("Creating 'testaccount5'", async () => {
    await axios
      .post(serverString("/users/register"), {
        Username: "testaccount5",
        Email: "testaccount5@test.com",
        Email2: "testaccount5@test.com",
        Password: "password1234",
        Password2: "password1234",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("Should login with 'testaccount5'", async () => {
    const response = await axios.post(serverString("/users/login"), {
      Email: "testaccount5@test.com",
      Password: "password1234",
    });
    auth.headers.Authorization = response.data.token;
    expect(response.data.success).toBe(true);
  });
});

describe("Adding Post", () => {
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
});

describe(`Adding Comment to Post ${PostId}`, () => {
  test("Should create new comment", async () => {
    const response = await axios.post(
      serverString(`/posts/${PostId}/comments`),
      {
        Body: "This is a test comment",
      },
      auth
    );
    CommentId = response.data.comment.id;
    expect(response.status).toBe(200);
  });
  test(`Should create new comment reply to ${CommentId}`, async () => {
    const response = await axios.post(
      serverString(`/posts/${PostId}/comments/${CommentId}`),
      {
        Body: "A reply to the parent comment",
      },
      auth
    );
    ChildId = response.data.comment.id;
    expect(response.status).toBe(200);
  });
  test(`Should dislike comment ${CommentId}`, async () => {
    const response = await axios.post(
      serverString(`/posts/${PostId}/comments/${CommentId}/0`),
      {},
      auth
    );
    expect(response.status).toBe(200);
  });
  test(`Should like comment ${CommentId}`, async () => {
    const response = await axios.post(
      serverString(`/posts/${PostId}/comments/${CommentId}/1`),
      {},
      auth
    );
    expect(response.status).toBe(200);
  });
  test(`Should delete child comment ${ChildId}`, async () => {
    const response = await axios.delete(
      serverString(`posts/${PostId}/comments/${ChildId}`),
      auth
    );
    expect(response.status).toBe(200);
  });
  test(`Should delete parent comment ${CommentId}`, async () => {
    const response = await axios.delete(
      serverString(`posts/${PostId}/comments/${CommentId}`, auth)
    );
    expect(response.status).toBe(200);
  });
});

describe("Deleting test post", () => {
  test("Should delete new post", async () => {
    const response = await axios.delete(serverString(`/posts/${PostId}`), auth);
    expect(response.status).toBe(200);
  });
});

describe("Deleting 'testaccount5'", () => {
  test("Should delete user 'testaccount5'", async () => {
    await axios
      .delete(serverString("/users/testaccount5"), auth)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
