const handleKeyDown = (handleSubmit) => {
  return (event) => {
      if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit();
      }
  };
}

export default handleKeyDown;