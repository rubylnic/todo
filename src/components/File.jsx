const File = ({ fileSrc, fileType, width }) => {
    if (fileType === "image") {
        return <img className="todo__img" width={width} src={fileSrc} alt="" />
    } else {
        return <a className="button" href={fileSrc} download target="_blank" rel="noreferrer">Click to download file</a>
    }
}
export default File;