/**
 * Написать функцию, которая вернет результат следующих условий
 * результат есть строка из сконкатенированных value элементов коллекции, расположенных в обратном порядке букв,
 * результат собирается только на непросроченных записей и конкатенируется в порядке возрастания order,
 * результат не содержит одинаковых букв.
 */

const input = [
  { value: "abcd", order: 4, expired: false },
  { value: "qwer", order: 2, expired: true },
  { value: "xyz1", order: 1, expired: false },
  { value: "abx2", order: 3, expired: false },
];

const fn = (data) => {
  return [
    ...new Set(
      data
        .filter((d) => !d.expired)
        .sort((a, b) => a.order - b.order)
        .flatMap((item) => item.value.split("").reverse())
    ),
  ].join("");
};

console.log(fn(input)); // 1zyx2badc
