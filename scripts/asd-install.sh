git clone https://github.com/$1/asd

cd asd
rm -rf .git*
cd ..
mv project-instructions fsd
mkdir project-instructions
mv fsd project-instructions
mv asd/project-instructions project-instructions/asd

mv asd/asd-projects asd-projects
rm -rf asd