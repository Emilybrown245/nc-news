import {useNavigate} from 'react-router-dom'

function NavBar () {

  const navigate = useNavigate();

    const handleChange = (e) => {
      const selectedTopic = e.target.value
      if(selectedTopic !== "Select" && ["coding", "football", "cooking"].includes(selectedTopic)){
        navigate(`/topics/${selectedTopic}`);
      } else if(selectedTopic === "Select") {
        navigate("/");
      }
    }

    return(
<div>
    <label htmlFor="dropdown">Select a topic: </label>
      <select id="dropdown" defaultValue="Select" onChange={handleChange}>
        <option>Select</option>
        <option>coding</option>
        <option>football</option>
        <option>cooking</option>
      </select>
</div>
        )
}

export default NavBar