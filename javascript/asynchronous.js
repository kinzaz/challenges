{
  const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
  ];
  Promise.all(urls.map((url) => fetch(url).then((resp) => resp.json()))).then(
    (data) => {
      console.log(data[0]);
      console.log(data[1]);
    }
  );

  // переписать на async/awair
  {
    const getData = async function () {
      const data = await Promise.all(
        urls.map((url) => fetch(url).then((resp) => resp.json()))
      );
      console.log(data[0]);
      console.log(data[1]);
    };
    getData();
  }
  // другой вариант с помощью for await of
  {
    const urls = [
      "https://jsonplaceholder.typicode.com/users",
      "https://jsonplaceholder.typicode.com/posts",
    ];
    const getData = async function (urls) {
      const arrayOfPromises = urls.map((url) => fetch(url));
      for await (let request of arrayOfPromises) {
        const data = await request.json();
        console.log(data);
      }
    };
    getData(urls);
  }
}

{
  // Написать последовательное выполнение 3 промисов
  const promisify = (item, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(item), delay);
    });
  };
  const a = () => promisify("a", 3000);
  const b = () => promisify("b", 1000);
  const c = () => promisify("c", 100);

  async function sequence(a, b, c) {
    const output1 = await a();
    const output2 = await b();
    const output3 = await c();

    return `secuence is done: ${output1} ${output2} ${output3}`;
  }
  sequence(a, b, c).then(console.log);
}

{
  // Написать параллельное выполнение 3 промисов
  const promisify = (item, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(item), delay);
    });
  };
  const a = () => promisify("a", 3000);
  const b = () => promisify("b", 1000);
  const c = () => promisify("c", 100);

  async function parallel(promises) {
    const [output1, output2, output3] = await Promise.all(promises);
    return `parallel is done: ${output1} ${output2} ${output3}`;
  }
  parallel([a(), b(), c()]).then(console.log);
}

{
  // Написать Race
  const promisify = (item, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(item), delay);
    });
  };
  const a = () => promisify("a", 3000);
  const b = () => promisify("b", 1000);
  const c = () => promisify("c", 100);

  async function race(promises) {
    const promise = await Promise.race(promises);
    return `First fullfiled promise is ${promise}`;
  }
  race([a(), b(), c()]).then(console.log);
}

// Как на верхнем уровне обеспечить последовательность вызова вместе с асинхронным кодом
{
  const getNum = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    console.log(data);
  };
  console.log(1);
  console.log(getNum());
  console.log(2);
  // задача выводы - 1, результат промиса, 2

  {
    const getNum = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log(data);
    };

    (async () => {
      console.log(1);
      await getNum();
      console.log(2);
    })();
  }

  // или так
  {
    const getNum = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log(data);
    };
    console.log(1);
    getNum().then(() => {
      console.log(2);
    });
  }
}

{
  console.log(1);

  setTimeout(() => console.log(2));

  Promise.resolve().then(() => console.log(3));

  Promise.resolve().then(() => setTimeout(() => console.log(4)));

  Promise.resolve().then(() => console.log(5));

  setTimeout(() => console.log(6));

  console.log(7);
}

{
  console.log(1);
  const a = new Promise((res, rej) => {
    console.log(2);
    rej();
  });

  setTimeout(() => console.log(3));

  a.then(() => console.log(4))
    .catch(() => console.log(5))
    .catch(() => console.log(6))
    .then(() => console.log(7));

  console.log(8);
}

{
  Promise.reject("a")
    .catch((p) => p + "b")
    .catch((p) => p + "c")
    .then((p) => p + "d")
    .finally((p) => p + "e")
    .then((p) => console.log(p));
}

{
  Promise.reject("a")
    .then(((p) => p + "1", (p) => p + "2"))
    .catch((p) => p + "b")
    .catch((p) => p + "c")
    .then((p) => p + "d1")
    .then("d2")
    .then((p) => p + "d3")
    .finally((p) => p + "e")
    .then((p) => console.log(p));
}

{
  console.log("start");

  setTimeout(() => console.log("timeout"), 0);

  new Promise((res, rej) => {
    console.log("promise constructor");
    rej();
  })
    .then(() => console.log("promise"))
    .catch(() => console.log("promise 1"))
    .catch(() => console.log("promise 2"))
    .then(() => console.log("promise3"))
    .then(() => console.log("promise4"));

  console.log("final");
}

{
  function promiseAll(promises) {
    const outputs = [];
    let settledPromiseCounter = 0;
    return new Promise((res, rej) => {
      promises.forEach((promise, i) => {
        promise
          .then((data) => {
            outputs[i] = data;
            settledPromiseCounter++;
            if (settledPromiseCounter === promises.length) {
              res(outputs);
            }
          })
          .catch(rej);
      });
    });
  }

  const promises = [Promise.resolve(1), Promise.resolve(2)];

  promiseAll(promises).then(console.log);
}

{
  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }

  async function delayedLog(item) {
    await delay();
    console.log(item);
  }

  async function process(array) {
    array.forEach((item) => {
      delayedLog(item);
    });
    console.log("Process!");
  }
  process([1, 2, 3, 4, 5]);

  {
    /**
     * Проблема заключается в том, что использование forEach с асинхронными функциями внутри не работает так,
     * как могло бы показаться. forEach не дожидается завершения асинхронных операций, прежде чем перейти к следующей итерации.
     * Поэтому в данном случае все асинхронные операции запускаются практически одновременно, а затем сразу выводится "Process!",
     * не дожидаясь завершения асинхронных операций.
     */
    function delay() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    async function delayedLog(item) {
      await delay();
      console.log(item);
    }

    async function process(array) {
      for (const item of array) {
        await delayedLog(item);
      }

      console.log("Process!");
    }
    process([1, 2, 3, 4, 5]);
  }
}

{
  const foo = async () => {
    console.log("1");

    const foo2 = async () => {
      console.log("2");
    };

    await foo2();

    console.log("4");
  };

  foo();

  console.log("3");

  //   // Переписать на промисы

  {
    const foo = () => {
      console.log("1");
      const foo2 = () => {
        return new Promise((resolve) => {
          console.log("2");
          resolve();
        });
      };
      return foo2().then(() => {
        console.log("4");
      });
    };

    foo();
    console.log("3");
  }
}

{
  const foo = async () => {
    console.log("1"); // 1

    Promise.resolve().then(() => console.log("4")); // 4

    const foo2 = async () => {
      console.log("2"); // 5
    };

    await foo2();

    console.log("5"); // 2
  };

  foo();

  console.log("3");
}

{
  const foo = async () => {
    console.log("?");

    Promise.resolve().then(() => console.log("?"));

    const foo2 = async () => {
      console.log("?");
    };

    await foo2();

    console.log("?");
  };

  foo();

  console.log("?");
}

{
  const foo = async () => {
    console.log("?");

    Promise.resolve().then(() => console.log("?"));

    const foo2 = async () => {
      console.log("?");

      new Promise((res) => {
        console.log("?");

        Promise.resolve().then(() => console.log("?"));
      });
    };

    await foo2();

    console.log("?");
  };

  foo();

  console.log("?");
}

// hard
{
  const foo = async () => {
    console.log("?");

    Promise.resolve().then(() => console.log("?"));

    const foo2 = async () => {
      console.log("?");

      const importValue = new Promise((res) => {
        console.log("?");

        Promise.resolve().then(() => console.log("?"));
      });

      await importValue;

      console.log("?");
    };

    await foo2();

    console.log("?");
  };

  foo();

  console.log("?");
}

// hard
{
  const foo = async () => {
    console.log("?");

    Promise.resolve().then(() => console.log("?"));

    const foo2 = async () => {
      console.log("?");

      const importValue = new Promise((res) => {
        console.log("?");

        Promise.resolve().then(() => console.log("?"));

        res();
      });

      await importValue;

      console.log("?");
    };

    await foo2();

    console.log("?");
  };

  foo();

  console.log("?");
}

// hard
{
  const foo = async () => {
    console.log("?");

    setTimeout(() => console.log("?"), 1);

    Promise.resolve().then(() => console.log("?"));

    const foo2 = async () => {
      console.log("?");

      const importValue = new Promise((res) => {
        console.log("?");

        Promise.resolve().then(() => console.log("?"));

        setTimeout(() => {
          res();
        }, 5);
      });

      await importValue;

      console.log("?");
    };

    await foo2();

    console.log("?");
  };

  foo();

  console.log("?");
}

// hard
{
  const foo = async () => {
    console.log("1");

    setTimeout(() => console.log("7"), 1);

    Promise.resolve().then(() => console.log("5"));

    const foo2 = async () => {
      console.log("2");

      Promise.resolve().then(() => setTimeout(() => console.log("8"), 0));

      const importValue = new Promise((res) => {
        console.log("3");

        Promise.resolve().then(() => console.log("6"));

        setTimeout(() => {
          res();
        }, 5);
      });

      await importValue;

      console.log("9");
    };

    await foo2();

    console.log("10");
  };

  foo();

  console.log("4");
}

// extreme
{
  const func1 = async () => {
    console.log("1", "?");

    setTimeout(() => console.log("2", "?"), 0);

    Promise.resolve().then(() => console.log("3", "?"));

    const func2 = async () => {
      setTimeout(() => console.log("4", "?"), 1);
      console.log("5", "?");
      Promise.resolve().then(() => setTimeout(() => console.log("6", "?"), 0));

      const importValue = new Promise((res) => {
        console.log("7", "?");
        Promise.resolve().then(() => console.log("8", "?"));

        setTimeout(() => {
          res();
        }, 5);
      });

      await importValue;

      console.log("9", "?");
    };

    Promise.resolve().then(() => console.log("10", "?"));

    await func2();

    console.log("11", "?");
  };

  func1();

  console.log("12", "?");
}

// hard
{
  const handleAsyncFirst = async () => {
    console.log("1", "?");

    setTimeout(() => {
      console.log("3", "?");
    }, 100);

    const handleAsyncSecond = async () => {
      setTimeout(() => {
        console.log("5", "?");
      });

      const importantValue = new Promise((res) => {
        console.log("6", "?");

        Promise.resolve().then(() => {
          console.log("7", "?");
        });

        setTimeout(() => {
          console.log("9", "?");
          res();
        }, 100);
      });

      await importantValue;

      console.log("10", "?");

      setTimeout(() => console.log("11", "?"));
    };

    await handleAsyncSecond();

    console.log("15", "?");
  };

  Promise.resolve().then(() => console.log("16", "?"));

  handleAsyncFirst();

  console.log("17", "?");
}

// hard
{
  const handleAsyncFirst = async () => {
    console.log("1", "?");

    setTimeout(() => {
      console.log("3", "?");
    }, 100);

    queueMicrotask(() =>
      Promise.resolve().then(() => {
        console.log("4", "?");
      })
    );

    const handleAsyncSecond = async () => {
      setTimeout(() => {
        console.log("5", "?");
      });

      const importantValue = new Promise((res) => {
        console.log("6", "?");

        Promise.resolve().then(() => {
          console.log("7", "?");
        });

        setTimeout(() => {
          console.log("9", "?");
          res();
        }, 100);
      });

      await importantValue;

      console.log("10", "?");

      setTimeout(() => console.log("11", "?2"));
    };

    await handleAsyncSecond();

    console.log("15", "?1");
  };

  Promise.resolve().then(() => console.log("16", "?"));

  handleAsyncFirst();

  console.log("17", "?");
}

// extreme
{
  const handleAsyncFirst = async () => {
    console.log("1", "?");

    setTimeout(() => {
      console.log("3", "?"); // macro 1 - 100ms
    }, 100);

    queueMicrotask(() =>
      Promise.resolve().then(() => {
        console.log("4", "?");
      })
    );

    const handleAsyncSecond = async () => {
      setTimeout(() => {
        console.log("5", "?");
      });

      const importantValue = new Promise((res) => {
        console.log("6", "?");

        Promise.resolve().then(() => {
          console.log("7", "?");
        });

        setTimeout(() => {
          console.log("9", "?");
          res();
        }, 100);
      });

      await importantValue;

      console.log("10", "?");

      setTimeout(() => console.log("11", "?"));

      queueMicrotask(() => {
        console.log("12", "?");

        setTimeout(() => console.log("13", "?"));

        Promise.resolve().then(() => console.log("14", "?"));
      });
    };

    await handleAsyncSecond();

    console.log("15", "?");
  };

  Promise.resolve().then(() => console.log("16", "?"));

  handleAsyncFirst();

  console.log("17", "?");
}

// extreme
{
  const handleAsyncFirst = async () => {
    console.log("1", "?");

    setTimeout(() => {
      console.log("3", "?");
    }, 100);

    queueMicrotask(() =>
      Promise.resolve().then(() => {
        console.log("4", "?");
      })
    );

    const handleAsyncSecond = async () => {
      setTimeout(() => {
        console.log("5", "?");
      });

      const importantValue = new Promise((res) => {
        console.log("6", "?");

        Promise.resolve().then(() => {
          console.log("7", "?");
        });

        requestAnimationFrame(() => {
          console.log("8", "?");
        });

        setTimeout(() => {
          console.log("9", "?");
          res();
        }, 100);
      });

      await importantValue;

      console.log("10", "?");

      setTimeout(() => console.log("11", "?"));

      queueMicrotask(() => {
        console.log("12", "?");

        setTimeout(() => console.log("13", "?"));

        Promise.resolve().then(() => console.log("14", "?"));
      });
    };

    await handleAsyncSecond();

    console.log("15", "?");
  };

  Promise.resolve().then(() => console.log("16", "?"));

  handleAsyncFirst();

  console.log("17", "?");
}

// extreme
{
  const handleAsyncFirst = async () => {
    console.log("1", "1");

    requestIdleCallback(
      () => {
        console.log("2", "?");
      },
      { timeout: 1 }
    );

    setTimeout(() => {
      console.log("3", "9");
    }, 100);

    queueMicrotask(() =>
      Promise.resolve().then(() => {
        console.log("4", "?");
      })
    );

    const handleAsyncSecond = async () => {
      setTimeout(() => {
        console.log("5", "?");
      });

      const importantValue = new Promise((res) => {
        console.log("6", "?");

        Promise.resolve().then(() => {
          console.log("7", "?");
        });

        requestAnimationFrame(() => {
          console.log("8", "?");
        });

        setTimeout(() => {
          console.log("9", "?");
          res();
        }, 100);
      });

      await importantValue;

      console.log("10", "?");

      setTimeout(() => console.log("11", "?"));

      queueMicrotask(() => {
        console.log("12", "?");

        setTimeout(() => console.log("13", "?"));

        Promise.resolve().then(() => console.log("14", "?"));
      });
    };

    await handleAsyncSecond();

    console.log("15", "?");
  };

  Promise.resolve().then(() => console.log("16", "?"));

  handleAsyncFirst();

  console.log("17", "?");
}

// extreme
{
  const handleAsyncFirst = async () => {
    console.log("1", "?");

    requestIdleCallback(
      () => {
        console.log("2", "?");
      },
      { timeout: 1 }
    );

    setTimeout(() => {
      console.log("3", "?");
    }, 100);

    const dateStart = Date.now();
    let dateNow = Date.now();

    while (dateNow <= dateStart + 200) {
      dateNow = Date.now();
    }

    queueMicrotask(() =>
      Promise.resolve().then(() => {
        console.log("4", "?");
      })
    );

    const handleAsyncSecond = async () => {
      setTimeout(() => {
        console.log("5", "?");
      });

      const importantValue = new Promise((res) => {
        console.log("6", "?");

        Promise.resolve().then(() => {
          console.log("7", "?");
        });

        requestAnimationFrame(() => {
          console.log("8", "?");
        });

        setTimeout(() => {
          console.log("9", "?");
          res();
        }, 100);
      });

      await importantValue;

      console.log("10", "?");

      setTimeout(() => console.log("11", "?"));

      queueMicrotask(() => {
        console.log("12", "?");

        setTimeout(() => console.log("13", "?"));

        Promise.resolve().then(() => console.log("14", "?"));
      });
    };

    await handleAsyncSecond();

    console.log("15", "?");
  };

  Promise.resolve().then(() => console.log("16", "?"));

  handleAsyncFirst();

  console.log("17", "?");
}

{
  console.log(1);

  setTimeout(() => {
    console.log(2);
  });

  Promise.resolve(3).then(console.log);

  console.log(4);

  setTimeout(() => {
    console.log(5);
  }, 0);

  console.log(6);

  const foo = () => {
    console.log("foo");

    return Promise.resolve().then(foo);
  };

  foo();
}

{
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);

  console.log(3);

  Promise.resolve().then(() => {
    console.log(4);
  });

  console.log(5);

  while ("") {
    console.log(6);
  }

  console.log(7);
}

{
  function func() {
    console.log(2);
    Promise.resolve().then(func);
  }

  func();
}

{
  function func2() {
    console.log(1);
    setTimeout(func2);
  }

  func2();
}

{
  // Написать тики event loop и порядок выполнения
  setTimeout(() => {
    console.log(1);
  }, 2);
  setTimeout(() => {
    console.log(2);
  }, 100);
  setTimeout(() => {
    console.log(3);
  }, 10);

  Promise.resolve("a").then(console.log);
  Promise.resolve("b").then(console.log);
  Promise.resolve("c").then(console.log);

  {
	// | a b c | 1 | 2 | 3
  }
}
