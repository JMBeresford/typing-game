import { Button, Header } from 'ui';

export default function Page() {
  return (
    <>
      <Header user={{ name: 'Foo' }} />
      <Button label='Bar' />
    </>
  );
}
