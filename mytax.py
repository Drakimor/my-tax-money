import webapp2
import logging
import jinja2
import os

from google.appengine.api import users

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')))

# Creates the main page
class MainPage(webapp2.RequestHandler):
	def get(self):
		logging.debug("MainPage: Started")
		template_values = {'title': "Tax Calculator"}
		template = jinja_environment.get_template('index.html')
		self.response.out.write(template.render(template_values))
		logging.debug("MainPage: Sent Content")
# Set up logging engine
logging.getLogger().setLevel(logging.DEBUG)

# Create app and assign functions to URL
app = webapp2.WSGIApplication([('/', MainPage)],
	debug=False)