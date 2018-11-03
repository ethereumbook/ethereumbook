from __future__ import print_function
import glob
import re
import requests

markup_files = glob.glob('*.asciidoc')
short_link = re.compile("http[s]*://bit.ly/([0-9a-zA-Z]+)")
heading = re.compile("^== (.*)$")
resolved = {}

for markup_file in markup_files:
	markup_f = open(markup_file, 'r')
	markup_contents = markup_f.read()
	markup_f.close()
	short_links = []
	for line in markup_contents.splitlines():
		heading_match = heading.match(line)
		if heading_match:
			print("\n=== "+heading_match.group(1)+"\n|===\n| Short Link | Expanded Link")
		short_link_match = short_link.match(line)
		if short_link_match:
			if short_link_match.group(1) not in short_links:
				short_links.append(short_link_match.group(1))
	session = requests.Session()
	if len(short_links):
		for link in short_links:
			try:
				resp = session.head("https://bit.ly/{link}".format(link=link), allow_redirects=True, timeout=5)
				resolved[link] = resp.url
			except:
				resolved[link] = "manual"

			print("| {link} | {resolved} ".format(link=link, resolved=resolved[link]))
		print("|===")
