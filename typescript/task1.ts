/**
 * Изменить тип Props таким образом, чтобы следующие два Person не показывали ошибку, а третий
 * Person показывал.
 *
 * Написать функцию, с помощью которой можно выполнить проверку вместе if (props.isForeigner) ниже без ошибок
 */
type Props = {
  name: string;
  passportId: string;
  address: string;
  isForeigner: boolean;
  country: string;
};

type TForeignerProps = {
  name: string;
  isForeigner: true;
  country: string;
};

type TLocalProps = {
  name: string;
  passportId: string;
  address: string;
  isForeigner: false;
};

// Гражданин (Foreigner = false всегда)
person({
  name: "Ivan",
  passportId: "123",
  address: "Moscow",
  isForeigner: false,
});

// Иностранец (Foreigner = true всегда)
person({
  name: "Joe",
  isForeigner: true,
  country: "Scotland",
});

// Ошибка (такого объекта быть не может)
person({
  name: "Bob",
  passportId: "321",
  isForeigner: false,
  country: "UK",
});

const isForeignerGuard = (
  props: TForeignerProps | TLocalProps
): props is TForeignerProps => {
  return Boolean((props as TForeignerProps).country);
};

function person(props: TForeignerProps): void;
function person(props: TLocalProps): void;
function person(props: any) {
  if (isForeignerGuard(props)) {
    console.log(props.name, "from", props.country);
  } else {
    console.log(props.name, "lives at", props.address);
  }
}
