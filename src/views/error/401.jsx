import './error.less'
import errorImg from '@/assets/images/error.png'
function error_401() {
  return (
    <>
      <div className='error'>
        <div className="error-content">
          <div className="num">4</div>
          <div className="img">
            <img src={errorImg} alt="" />
          </div>
          <div className="num">1</div>
        </div>
        <div className="hint">
          暂无页面权限，请联系管理员！
        </div>
      </div>
    </>
  )
}

export default error_401