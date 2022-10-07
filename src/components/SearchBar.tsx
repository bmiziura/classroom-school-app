import { ChangeEventHandler } from "react"
import { FaSearch } from "react-icons/fa"

const SearchBar = ({
  value,
  onChange,
}: {
  value: any
  onChange: ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <div className="mb-4 flex items-center justify-center">
      <div className="bg-white px-8 py-4 flex items-center gap-4 rounded-full w-full max-w-[400px]">
        <FaSearch />

        <input
          type="text"
          placeholder="Search Post"
          value={value}
          onChange={onChange}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default SearchBar
