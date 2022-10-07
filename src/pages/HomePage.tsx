import { useState } from "react"

import Header from "../components/Header"
import PostList from "../components/PostList"
import SearchBar from "../components/SearchBar"
import useDebounce from "../hooks/useDebounce"

const HomePage = () => {
  const [searchText, setSearchText] = useState("")

  const debouncedSearchText = useDebounce(searchText, 500)

  return (
    <div>
      <Header />

      <div className="mt-8">
        <SearchBar
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value)
          }}
        />

        <PostList searchText={debouncedSearchText} />
      </div>
    </div>
  )
}

export default HomePage
