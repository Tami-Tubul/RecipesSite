import { Container } from "@material-ui/core";

function Category(props) {
  return (
  <Container maxWidth="xs">
    <div className="ui card">
      <h1>{props.show.Name}</h1>
      </div>
    </Container>
  );
}

export default Category;
