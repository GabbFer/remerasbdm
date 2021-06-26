
import app from './app'
app.listen(app.get('port'))
console.info("app at port: ",app.get('port'))
