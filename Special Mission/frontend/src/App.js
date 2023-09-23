import {BrowserRouter, Routes, Route} from "react-router-dom";
import BookList from './components/BookList';
import Banner from './components/Banner';
import Banner2 from './components/Banner2';
import EditBook from './components/EditBook';
import AddBook from "./components/AddBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <BookList />
          </>
        }/>
        <Route path="/edit-book/:id" element={
          <>
            <Banner2 />
            <EditBook />
          </>
        }/>

        <Route path="/add-book" element={
          <>
            <Banner2 />
            <AddBook />
          </>
        }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
