function App() {
  return (
    <div className="App">
      <form>
        <input name="email" type="email" required="true" />
        <input name="password" type="password" required="true" />
        <input name="confirmPassword" type="password" required="true" />
        <button type="submit"> submit </button>
      </form>
    </div>
  );
}

export default App;
