import Header from "../components/Header"
import PostList from "../components/PostList"

const HomePage = () => {
  return (
    <div>
      <Header />

      <div className="mt-8">
        <PostList />
      </div>
    </div>
  )
}

export default HomePage
