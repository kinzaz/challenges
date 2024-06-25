interface Product {
  id: string;
  title: string;
}

interface CommentProduct {
  id: string;
  body: string;
  userId: string;
  productId: string;
}

interface User {
  id: string;
  name: string;
  age: number;
}

interface ProductToShow {
  id: string;
  title: string;
  comments: ICommentWithUser[];
}

interface ICommentWithUser {
  id: string;
  body: string;
  user: User;
}

function mergeArrays({
  products,
  comments,
  users,
}: {
  products: Product[];
  users: User[];
  comments: CommentProduct[];
}): ProductToShow[] {
  const userMap: { [id: string]: User } = {};

  for (const user of users) {
    userMap[user.id] = user;
  }

  const commentsMap: {
    [productId: string]: ICommentWithUser[];
  } = {};

  for (const comment of comments) {
    if (!commentsMap[comment.productId]) {
      commentsMap[comment.productId] = [];
    }

    commentsMap[comment.productId].push({
      id: comment.id,
      body: comment.body,
      user: userMap[comment.userId],
    });
  }

  return products.map((product) => ({
    id: product.id,
    title: product.title,
    comments: commentsMap[product.id],
  }));
}

// O(n3)
// const mergeArrays = () => {
//   return products.map((product) => ({
//     id: product.id,
//     title: product.title,
//     comments: comments
//       .filter((comment) => product.id === comment.productId)
//       .map((comment) => ({
//         id: comment.id,
//         body: comment.body,
//         user: users.find((user) => user.id === comment.userId)!,
//       })),
//   }));
// };

console.log(
  mergeArrays({
    products: [
      { id: "productId-1", title: "productTitle" },
      { id: "productId-2", title: "productTitle-2" },
    ],
    comments: [
      {
        id: "commentId-1",
        body: "body comment",
        userId: "userId-1",
        productId: "productId-1",
      },
      {
        id: "commentId-2",
        body: "body comment-2",
        userId: "userId-1",
        productId: "productId-2",
      },
    ],
    users: [{ id: "userId-1", age: 12, name: "Joe" }],
  })
);
