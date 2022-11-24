/**
 * Компонент для вывода файла, загруженного из базы данных
 *
 * @component
 * @example
 * const fileSrc = "https://firebasestorage.googleapis.com/v0/b/todo-10778.appspot.com/o/files%2F9.jpg?alt=media&token=8e7114b6-c232-4cee-b857-9e4cf58dbe52"
 * const fileType = 'photo'
 * const width = 50
 * return (
 * <File fileSrc={fileSrc} fileType={'photo'} width={50} />
 * )
 */
const File = ({ fileSrc, fileType, width }) => {
    if (fileType === "image") {
        return <img className="todo__img" width={width} src={fileSrc} alt="" />
    } else {
        return <a className="button" href={fileSrc} download target="_blank" rel="noreferrer">Click to download file</a>
    }
}
export default File;