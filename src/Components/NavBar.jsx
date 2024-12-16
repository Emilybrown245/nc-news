function NavBar () {
    return(
        <form>
            <label htmlFor="topic-search">Search articles by topic: </label>
            <input type="text" id="topic-search" name="topic" placeholder="topic"></input>
            <button type="submit">Search</button>
        </form>

        )
    
}

export default NavBar