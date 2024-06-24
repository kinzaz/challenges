// Реализовать функцию парсинга csv файла

const csv = `Name,Age,Job
Alice,30,Engineer
Bob,40,Doctor`;

const parse = (data) => {
  const [category, ...restData] = data.split("\n");
  const headers = category.split(",");

  return restData.map((row) => {
    const values = row.split(",");
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index];
    });

    return obj;
  });
};

console.log(parse(csv));
