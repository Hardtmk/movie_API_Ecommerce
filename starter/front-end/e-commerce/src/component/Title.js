export default function Title(props) {
  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>
        {props.mainTitle}
        {props.subTitle}
      </h1>
    </div>
  );
}
