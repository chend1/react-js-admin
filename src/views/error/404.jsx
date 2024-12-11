import './error.less'
import errorImg from '@/assets/images/error.png'
function error_404() {
  return (
    <>
      <div className='error'>
        <div className="error-content">
          <div className="num">4</div>
          <div className="img">
            <img src={errorImg} alt="" />
          </div>
          <div className="num">4</div>
        </div>
        <div className="hint">
          页面走丢了，请检查访问路径是否正确！
        </div>
      </div>
    </>
  )
}

export default error_404