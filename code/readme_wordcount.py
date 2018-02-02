from __future__ import print_function
import glob
import re

markup_files = glob.glob('*.asciidoc')

wordcount = {}
wordcount_sum = 0

for markup_file in markup_files:
    markup_f = open(markup_file, 'r')
    markup_contents = markup_f.read()
    markup_f.close()
    wc = len(markup_contents.strip().split())
    wordcount_sum += wc
    wordcount[markup_file] = wc
    print(wc, "\t", markup_file)
print(wordcount_sum)

readme_f = open('README.md','r')
readme = readme_f.read()
readme_f.close()

wc_tag_re = re.compile("\| +(\[.*\])\((.*asciidoc)\) +\| +[\#]* +\|")

readme_f = open('README.md','w')
for line in readme.splitlines():
	match_re = wc_tag_re.match(line)
	if match_re:
		wordcount_bar = "#" * ((wordcount[match_re.group(2)]//500) + 1)
		line = match_re.expand("| \g<1>(\g<2>) | " + wordcount_bar + " |")
	readme_f.write(line+"\n")
readme_f.close()
