function Item(props) {
  return (
    <div className="ui card">
      <div className="image">
        <img src={props.show.Img} />
      </div>
      <div className="content">
        <h2>{props.show.Name}</h2>
        <h1>מרכיבים</h1>
        <ul>
        {props.show.Ingrident.map((ingredient, index) => (
    <li key={index}>
      {ingredient.Name} - {ingredient.Count} {ingredient.Type}
    </li>
  ))}
        </ul>
      </div>
      <div className="meta">
        <div>{props.show.Duration}</div>
        <div className="description">{props.show.Description}</div>
        <div>{props.show.Difficulty}</div>
        <h1>הוראות</h1>
        <ul>
          {props.show.Instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Item;
