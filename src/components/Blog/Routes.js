
export const Routes = (
  <Route exact path="/" component={Home}></Route>
  <Route exact path="/:postName" component={SinglePost}></Route>
  <Route exact path="/category/:categoryName" component={Category}></Route>
)