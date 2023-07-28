import React, { useState, useCallback, useEffect } from "react";


const LimitedTextArea = ({ value, limit, onChange, domId }) => {
  const [content, setContent] = useState("");

  const setFormattedContent = useCallback(
    text => {
      // const limitedContent = text.slice(0, limit)
      const limitedContent = text.slice(0, limit)
      setContent(limitedContent);
      onChange(limitedContent);
    },
    [limit, setContent ]
  );
  // useCallback is used to isolate resource intensive functions so that they won't automatically run on every render; it only runs when one of its dependencies update - I thought useEffects run every time one of its dependencies updates? What's the difference?

  useEffect(() => {
    setFormattedContent(value)
  }, [value])

  return (
    <div>
      <textarea
        id={domId}
        onChange={event => setFormattedContent(event.target.value)}
        value={content}
      />
      <p>
        Maximum length: {limit}<br></br>
        {content.length}/{limit}
      </p>
    </div>
  );
}

export default LimitedTextArea;