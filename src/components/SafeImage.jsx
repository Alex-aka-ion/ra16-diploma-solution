import React, {useState} from "react";

export default function SafeImage(props) {
    const [imgLink, setImgLink] = useState(props.src);
    const [errored, setErrored] = useState(false);

    const handleError = (e) => {
        if (!errored) {
            setImgLink('/img/no-image.png');
            setErrored(true);
        }
    }

    return (
        <img {...props} src={imgLink} onError={handleError} alt={props.alt}/>
    )
}
