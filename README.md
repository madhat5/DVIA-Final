# DVIA assign 4
### Education and Salary difference btw men and women

### Setup (fix)
1. npm install
2. node *fileName.js*
3. open local server to index:html

============================================================
### Reqs & output

- Reqs
> Theme: "Uncertanties"
> https://canvas.newschool.edu/courses/1525001/assignments/8214568
> https://canvas.newschool.edu/courses/1525001/pages/dvia-final-project-overview

proposal link: https://docs.google.com/document/d/1TN6jKburhzMQtglane7kCpJStGc9U8LrgKLgSS3hiuU/edit

- Output: 
> url
![screenshot title](screenshot-title)


============================================================
### Project Approach
Answer project questions as you go along
1. Audience questions + sketch
2. Check + prep data (acquire, parse, filter)
3. Mine/explore/sketch/iterate several simple graphics, re: stories (same or diff?), pick one
4. Code initial draft (pseudo first?)
5. Refine/declutter/clean/annotate/clarify (color, labels, titles, legend, summary, etc)
6. Interactivity (more than tooltips, eg: scrolling)
7. Share

*=====================*
**1**
- Why are we doing this?
    - What are questions that you want to explore with this visualization?
- What are you hoping to achieve?
    - What will I be looking at(title)?
- Who are we targeting?
    - How is the end product going to be used?
    - How are we publishing?

- Sketch summary:
    - sketch
    - Questions
    - Data set
    - Inspirations
    - Data vis method
    - Current problems

*=====================*
**2**
- What data do we have available? 
    - Which quantitative dataset is used? 
        > https://measuringu.com/qual-methods/
        > https://www.questionpro.com/blog/qualitative-research-methods/
    - What are the properties of the data set? 
    - How many data points
    - What's the quality of the data? 
    - Which other existing materials should we take into account?
    - Which constraints do we have?
- explore
    - w/ R
        > https://www.r-graph-gallery.com/all-graphs.html
        > https://cran.r-project.org/web/packages/tidyjson/vignettes/visualizing-json.html
    - w/ RawGraphs 
        > https://rawgraphs.io/
        > https://github.com/densitydesign/raw/
    - w/ DataWrapper
        > https://app.datawrapper.de/create/map
- clean
    > https://csvjson.com/csv2json
    > https://www.npmjs.com/package/csvtojson

*=====================*
**3-6**
- Which visualization method is used and why? What tool?
    > https://www.data-to-viz.com/
    > https://www.d3-graph-gallery.com/
    > https://www.d3indepth.com/
    > https://observablehq.com/@d3/
    > https://observablehq.com/@d3/gallery
    > https://python-graph-gallery.com/
    > https://www.r-graph-gallery.com/
    > https://bl.ocks.org/
    > https://bost.ocks.org/mike/
    > https://www.axismaps.com/projects
    > http://datamaps.github.io/ | https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started
    > https://kepler.gl/
    > https://plotly.com/ | https://github.com/plotly/plotly.js
    > https://geojson.io/
    > Adobe Illustrator / Photoshop / After Effects
- What does the visualization enable?
- Is this a static visualization? Is it interactive?
- color: Is it intentional and intuitive? data decodable by audience?
    > https://colorhunt.co/
    > https://d3-legend.susielu.com/
    > https://colorbrewer2.org/
    - legends, annotations
- clear text hierarchy?
- link to raw data?

*=====================*
**7**
- Who else is doing something similar?
- Abstract/summary/about, re: methodolgy? (1-2 pars)
    - What were your considerations? 
    - What tools did you explore? 
    - What challenges did you run into? 
    - How did you iterate?


============================================================
### Concept & build
1. `Types of data`
- dataset: 
    > https://www.pro-football-reference.com/
    > https://www.betfirm.com/point-spreads-for-every-super-bowl/
    > https://www.thelines.com/super-bowl-coin-toss-history/
    > https://sercc.com/SuperBowlClimate.pdf
    - starting at 2000
- mostly quantitative, and temporal including:
    - quant (toggle btw?):
        - layout for scatter plot?
            - color for favorite/underdog; 
            - shape for winner/loser
            - x = years; y = odds/coin toss?
        - betting odds
        - record (wins/losses, margins of victory?, heads up record)?
        - coin toss record
            - heads/tails?
        - injuries
        - weather (temp. wind, precipitation)?
    - geo: 
        - locations of both teams + SB location?
        - radius = times team has won (historical)
        - color = favorite/underdog
- sketch: report includes
    - scatter plot?
    - map
- interactive
    - can i build in such a way where user toggles variables to see outcomes?
    - add guessing game?
        - hide winner/loser stats > have user guess > reveal w/l

2. `Questions`
- does spread measure the rate of uncertainty? (eg higher spread = higher uncertainty)

3. `Audience`
- Target:
    - sports enthusiats/analysts
    - sports team managers?
- What factors influence championship wining seasons?
- have an interactive report, with a drop down for years (+ all)?

4. `Tools`
    - d3 (circle packing)
    - JS/CSS/HTML (custom)
    - Adobe Photoshop/Illustrator


### next
- position + radius based on spread & over/under (x)
- add .gitignore
- size
- bg:
    - color circles per team
    - or setup custom diagram


### quick notes
- Data
    - > (sports-reference?)
    - 1. how sports odds/betting measures even uncertainty? (odds vs result)
        - factors that go in to odds include: 
            - win/loss rates; winning streaks
            - individual player acquisitions
            - previous record agains team x
    - 2. championship coin toss vs game winner?
        - probability of winning game with coin toss?
    - *3. a complete evaluation report of championship uncertainty in sports?*
        - frequency framing of coin toss
        - distribution chart of win/loss
        - error bar of points scored?
        - chart for odds from (1.)

- likely visuals
    - error bars, confidence bands (more technical user friendly)
    - frequency framing (more lay user friendly)
        - visualizing a probability as a frequency
    - quantile dot plot?
    - multi chart?
        - pick team > odds team winning > odds division winning > odds conference winning

============================================================
##### Project refs
> https://clauswilke.com/dataviz/visualizing-uncertainty.html *!*
> https://d-nb.info/1138284831/34 *!*
> https://www.betfirm.com/point-spreads-for-every-super-bowl/ *!*
> https://www.thelines.com/super-bowl-coin-toss-history/ *!*
> https://www.3cs.ch/visualizing-uncertainty/
> https://flowingdata.com/2018/01/08/visualizing-the-uncertainty-in-data/
> https://medium.com/multiple-views-visualization-research-explained/uncertainty-visualization-explained-67e7a73f031b
> https://www.researchgate.net/publication/290190992_Do_sports_fans_really_value_uncertainty_of_outcome_Evidence_from_the_English_Premier_League
> https://www.sportsoddshistory.com/nfl-odds/
> https://www.sportingnews.com/us/nfl/news/super-bowl-weather-history-rain-wind-cold-snow/1diqsbswj63pg1u4rybj2snjw0

##### Code refs
> https://bl.ocks.org/d3indepth/fee5ce57c3fc3e94c3332577d1415df4

### Notes
- Methodology influences:
    - Ben Fry, Amanda Cox, Alberto Cairo, Mike Bostock