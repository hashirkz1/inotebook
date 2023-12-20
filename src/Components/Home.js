import Notes from "./Notes";
const Home = (props) => {
  return (
    <div style={{height : '30vw'}} className="container">
      <h1>Add a Note</h1>
      <Notes ShowAlert={props.ShowAlert} />
    </div>
  );
};

export default Home;
