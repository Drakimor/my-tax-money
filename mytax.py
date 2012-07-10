import webapp2
import logging
import jinja2
import os

from google.appengine.api import users

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')))

class MainPage(webapp2.RequestHandler):
	def get(self):
		logging.debug("Started Main Page")
		logging.debug("Sent Content")
		template_values = {'title': "Tax Calculator"}
		template = jinja_environment.get_template('index.html')
		self.response.out.write(template.render(template_values))

logging.getLogger().setLevel(logging.DEBUG)

app = webapp2.WSGIApplication([('/', MainPage)],
	debug=False)

# def get(self):
# 	logging.debug("Started Main Page")
# 	user = users.get_current_user()		

# 	logging.debug("Sent Content")

# 	if user:
# 		# self.response.headers['Content-Type'] = 'text/html'			
# 		# self.response.out.write("Heya, %s!"% user.nickname())
# 		template_values = {'user': user.nickname(),
# 							'title': "Test App"}
# 		template = jinja_environment.get_template('index.html')
# 		self.response.out.write(template.render(template_values))
# 	else:
# 		self.redirect(users.create_login_url(self.request.uri))