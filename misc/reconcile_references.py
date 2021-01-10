from __future__ import print_function
import glob
import re

markup_files = glob.glob('*.asciidoc')
anchor_re = re.compile("\[\[(.*)\]\]")
ref_re = re.compile(".*\<\<([^\>]*)\>\>.")

refs = []
anchors = []
dup_anchors = []

for markup_file in markup_files:
	markup_f = open(markup_file, 'r')
	markup_contents = markup_f.read()
	markup_f.close()
	for line in markup_contents.splitlines():
		ref_match = ref_re.match(line)
		if ref_match:
			if ref_match.group(1) not in refs:
				refs.append(ref_match.group(1))
		anchor_match = anchor_re.match(line)
		if anchor_match:
			if anchor_match.group(1) not in anchors:
				anchors.append(anchor_match.group(1))
			else:
				dup_anchors.append(anchor_match.group(1))

print("\nAnchors: ", len(anchors))
print("\nDuplicated Anchors: ", len(dup_anchors))
print(dup_anchors)
print("\nReferences: ", len(refs))
print(refs)
broken_refs = list(set(refs) - set(anchors))
print("\nBroken references: ", len(broken_refs), broken_refs)
missing_refs = list(set(anchors) -  set(refs))
print("\nUn-referenced Anchors: ", len(missing_refs), missing_refs)
