const img = query("img");
const container = query(".container");
const overlay = query(".overlay");
const paths = query(".paths");
const importInput = query("#importInput");
const next = query("#next");
const prev = query("#prev");
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0; selected = undefined;
let page = 0, pageData = [[[[590.72,454.4,"P3",-2,0,0,0],[499.84,363.52,"P2",-4,0,0,0],[681.6,545.28,"P1",-2,0,0,0],[408.96,681.6,"P4",-4,0,0,0],[499.84,772.48,"P5",-4,0,0,0],[590.72,863.36,"P7",-2,0,0,0],[681.6,954.24,"P6",-2,0,0,0],[408.96,454.4,"BD1",12,0,0,0],[408.96,499.84,"BD2",12,0,0,0],[408.96,590.72,"BD4",12,0,0,0],[408.96,545.28,"BD3",12,0,0,0],[681.6,863.36,"T6",-2,0,0,0],[681.6,772.48,"T4",-2,0,0,0],[681.6,817.92,"T5",-2,0,0,0],[681.6,727.04,"T3",-2,0,0,0],[681.6,681.6,"T2",-2,0,0,0],[681.6,636.16,"T1",-2,0,0,0],[681.6,590.72,"M1",-2,0,0,0],[636.16,817.92,"C4",-2,0,0,0],[636.16,772.48,"C11",-2,0,0,0],[636.16,727.04,"C5",-2,0,0,0],[636.16,681.6,"C10",-2,0,0,0],[636.16,636.16,"C6",-2,0,0,0],[636.16,590.72,"C9",-2,0,0,0],[636.16,545.28,"C7",-2,0,0,0],[636.16,499.84,"C8",-2,0,0,0],[590.72,499.84,"AS3",-2,0,0,0],[590.72,545.28,"AS4",-2,0,0,0],[590.72,590.72,"AS2",-2,0,0,0],[590.72,636.16,"AS1",-2,0,0,0],[590.72,681.6,"C3",-2,0,0,0],[590.72,727.04,"C2",-2,0,0,0],[590.72,772.48,"C1",-2,0,0,0],[545.28,727.04,"Δ1",-2,0,0,0],[545.28,681.6,"Δ2",-2,0,0,0],[545.28,636.16,"Tb3",-2,0,0,0],[545.28,590.72,"Tb4",-2,0,0,0],[545.28,545.28,"Tb2",-2,0,0,0],[545.28,499.84,"Tb1",-2,0,0,0],[545.28,454.4,"TS2",-2,0,0,0],[545.28,408.96,"TS1",-2,0,0,0],[499.84,408.96,"Δ4",-2,0,0,0],[499.84,454.4,"Δ3",-2,0,0,0],[499.84,499.84,"F1",-2,0,0,0],[499.84,545.28,"F2",-2,0,0,0],[499.84,590.72,"F3",-2,0,0,0],[499.84,641.84,"F4",-2,0,0,0],[499.84,681.6,"F5",-2,0,0,0],[454.4,636.16,"Q2",-2,0,0,0],[454.4,590.72,"Q1",-2,0,0,0],[454.4,545.28,"S2",-2,0,0,0],[454.4,499.84,"S1",-2,0,0,0],[454.4,454.4,"Cy2",-2,0,0,0],[454.4,408.96,"Cy1",-2,0,0,0]],[[56.8,56.8,"(16) End of Opener"],[56.8,386.24,"MM 1-2"]],[[119.28,56.8,"Go to Ballad, Move 8 counts / 16 steps"]],[],["(16) End of Opener",60,0,8]],[[[727.04,477.12,"P3",-4,0,0,0],[727.04,454.4,"P2",-4,0,0,0],[727.04,499.84,"P1",-4,0,0,0],[454.4,727.04,"P4",-2,0,0,0],[499.84,954.24,"P5",-6,0,0,0],[568,954.24,"P7",-6,0,0,0],[636.16,954.24,"P6",-6,0,0,0],[408.96,613.44,"BD1",12,0,0,0],[408.96,647.52,"BD2",12,0,0,0],[408.96,715.68,"BD4",12,0,0,0],[408.96,681.6,"BD3",12,0,0,0],[727.04,692.96,"T6",-2,0,0,0],[681.6,641.84,"T4",-2,0,0,0],[727.04,658.88,"T5",-2,0,0,0],[727.04,624.8,"T3",-2,0,0,0],[727.04,590.72,"T2",-2,0,0,0],[681.6,630.48,"T1",-6,0,0,0],[636.16,647.52,"M1",-4,0,0,0],[636.16,511.2,"C4",-4,0,0,0],[636.16,477.12,"C11",-4,0,0,0],[636.16,443.04,"C5",-4,0,0,0],[636.16,408.96,"C10",-4,0,0,0],[636.16,374.88,"C6",-4,0,0,0],[636.16,340.8,"C9",-4,0,0,0],[636.16,306.72,"C7",-4,0,0,0],[636.16,272.64,"C8",-4,0,0,0],[590.72,863.36,"AS1",4,0,0,0],[636.16,545.28,"C3",-4,0,0,0],[636.16,579.36,"C2",-4,0,0,0],[636.16,613.44,"C1",-4,0,0,0],[499.84,727.04,"Δ1",-2,0,0,0],[499.84,681.6,"Δ2",-2,0,0,0],[545.28,863.36,"Tb3",-2,0,0,0],[545.28,817.92,"Tb4",-2,0,0,0],[545.28,772.48,"Tb2",-2,0,0,0],[545.28,727.04,"Tb1",-2,0,0,0],[545.28,681.6,"TS2",-2,0,0,0],[545.28,636.16,"TS1",-2,0,0,0],[454.4,454.4,"Δ4",-2,0,0,0],[454.4,499.84,"Δ3",-2,0,0,0],[499.84,318.08,"F1",-2,0,0,0],[499.84,363.52,"F2",-2,0,0,0],[499.84,408.96,"F3",-2,0,0,0],[499.84,454.4,"F4",-2,0,0,0],[499.84,499.84,"F5",-2,0,0,0],[408.96,579.36,"Q2",-4,0,0,0],[408.96,545.28,"Q1",-4,0,0,0],[408.96,511.2,"S2",-4,0,0,0],[408.96,477.12,"S1",-4,0,0,0],[408.96,443.04,"Cy2",-4,0,0,0],[408.96,408.96,"Cy1",-4,0,0,0],[590.72,772.48,"AS4",4,0,0,0],[590.72,817.92,"AS2",4,0,0,0],[590.72,727.04,"AS3",4,0,0,0],[727.04,477.12,"Flag Change",-12,0,0,1],[568,954.24,"Flag Change",0,-4,0,1]],[[56.8,56.8,"(B1) Half Way Set"],[56.8,363.52,"MM 3-4"]],[[119.28,56.8,"Move 7 counts / 14 steps"]],[],["(B1) Half Way Set",60,0,7]],[[[568,590.72,"P3",8,0,0,0],[607.76,619.12,"P2",4,0,0,0],[607.76,653.2,"P1",4,0,0,0],[363.52,636.16,"P4",-2,0,0,0],[528.24,619.12,"P5",-4,0,0,0],[528.24,653.2,"P7",-4,0,0,0],[568,681.6,"P6",0,0,0,0],[386.24,545.28,"BD1",12,0,0,0],[363.52,573.68,"BD2",12,0,0,0],[318.08,624.8,"BD4",12,0,0,0],[335.12,596.4,"BD3",12,0,0,0],[681.6,675.92,"T6",-4,0,0,0],[568,647.52,"T4",-2,0,0,0],[687.28,641.84,"T5",-4,0,0,0],[681.6,602.08,"T3",-4,0,0,0],[664.56,573.68,"T2",-4,0,0,0],[568,624.8,"T1",-6,0,0,0],[528.24,522.56,"M1",-4,0,0,0],[624.8,420.32,"C4",-4,0,0,0],[641.84,397.6,"C11",-4,0,0,0],[658.88,363.52,"C5",-4,0,0,0],[670.24,335.12,"C10",-4,0,0,0],[681.6,301.04,"C6",-4,0,0,0],[681.6,261.28,"C9",-4,0,0,0],[670.24,232.88,"C7",-4,0,0,0],[641.84,210.16,"C8",-4,0,0,0],[573.68,766.8,"AS1",2,0,0,0],[602.08,448.72,"C3",-4,0,0,0],[573.68,471.44,"C2",-4,0,0,0],[550.96,499.84,"C1",-4,0,0,0],[437.36,624.8,"Δ1",-4,0,0,0],[448.72,596.4,"Δ2",-4,0,0,0],[545.28,772.48,"Tb3",-1,0,0,0],[511.2,761.12,"Tb4",-1,0,0,0],[482.8,738.4,"Tb2",-2,0,0,0],[460.08,721.36,"Tb1",-3,0,0,0],[437.36,687.28,"TS2",-3,0,0,0],[431.68,658.88,"TS1",-4,0,0,0],[499.84,545.28,"Δ4",-4,0,0,0],[477.12,568,"Δ3",-4,0,0,0],[550.96,238.56,"F1",-4,0,0,0],[568,266.96,"F2",-4,0,0,0],[562.32,301.04,"F3",-4,0,0,0],[550.96,335.12,"F4",-4,0,0,0],[539.6,369.2,"F5",-4,0,0,0],[408.96,522.56,"Q2",-4,0,0,0],[437.36,499.84,"Q1",-4,0,0,0],[460.08,477.12,"S2",-4,0,0,0],[482.8,448.72,"S1",-4,0,0,0],[505.52,426,"Cy2",-4,0,0,0],[522.56,397.6,"Cy1",-4,0,0,0],[636.16,727.04,"AS4",18,0,0,0],[607.76,749.76,"AS2",18,0,0,0],[658.88,704.32,"AS3",18,0,0,0],[590.72,45.44,"​P4",-2,0,0,1],[590.72,45.44,"Flag Change",-8,-4,0,1]],[[56.8,56.8,"(B2) Trumpet Duet"],[56.8,374.88,"MM 5-12"]],[[119.28,56.8,"Hold 12 counts / 24 steps, MM 5-10"],[164.72,56.8,"Move 8 counts / 16 steps MM 11-12"]],[[1,[363.52,636.16],[374.88,619.12],[397.6,590.72],[420.32,568],[437.36,550.96],[465.76,522.56],[499.84,488.48],[528.24,460.08],[550.96,431.68],[579.36,391.92],[607.76,346.48],[619.12,318.08],[624.8,284],[613.44,255.6],[596.4,232.88],[562.32,187.44],[545.28,142],[545.28,119.28],[562.32,73.84],[590.72,45.44]],[1,[607.76,619.12],[607.76,653.2],[596.4,670.24],[579.36,681.6],[568,681.6],[556.64,681.6],[539.6,670.24],[528.24,653.2],[528.24,619.12],[539.6,602.08],[556.64,590.72],[568,590.72],[579.36,590.72],[596.4,602.08],[607.76,619.12],[607.76,653.2],[596.4,670.24],[579.36,681.6],[568,681.6],[556.64,681.6],[539.6,670.24],[528.24,653.2],[528.24,619.12],[539.6,602.08],[556.64,590.72],[568,590.72],[579.36,590.72],[596.4,602.08],[607.76,619.12],[607.76,653.2],[596.4,670.24],[579.36,681.6],[568,681.6],[556.64,681.6],[539.6,670.24],[528.24,653.2],[528.24,619.12],[539.6,602.08],[556.64,590.72],[568,590.72]]],["(B2) Trumpet Duet",60,0,24]],[[[568,590.72,"P3",8,0,0,0],[607.76,619.12,"P2",4,0,0,0],[607.76,653.2,"P1",4,0,0,0],[363.52,636.16,"P4",-2,0,0,1],[528.24,619.12,"P5",-4,0,0,0],[528.24,653.2,"P7",-4,0,0,0],[568,681.6,"P6",0,0,0,0],[386.24,545.28,"BD1",12,0,0,0],[363.52,573.68,"BD2",12,0,0,0],[318.08,624.8,"BD4",12,0,0,0],[335.12,596.4,"BD3",12,0,0,0],[681.6,675.92,"T6",-4,0,0,0],[568,647.52,"T4",-2,0,0,0],[687.28,641.84,"T5",-4,0,0,0],[681.6,602.08,"T3",-4,0,0,0],[664.56,573.68,"T2",-4,0,0,0],[568,624.8,"T1",-6,0,0,0],[528.24,522.56,"M1",-4,0,0,0],[624.8,420.32,"C4",-4,0,0,0],[641.84,397.6,"C11",-4,0,0,0],[658.88,363.52,"C5",-4,0,0,0],[670.24,335.12,"C10",-4,0,0,0],[681.6,301.04,"C6",-4,0,0,0],[681.6,261.28,"C9",-4,0,0,0],[670.24,232.88,"C7",-4,0,0,0],[641.84,210.16,"C8",-4,0,0,0],[573.68,766.8,"AS1",2,0,0,0],[602.08,448.72,"C3",-4,0,0,0],[573.68,471.44,"C2",-4,0,0,0],[550.96,499.84,"C1",-4,0,0,0],[437.36,624.8,"Δ1",-4,0,0,0],[448.72,596.4,"Δ2",-4,0,0,0],[545.28,772.48,"Tb3",-1,0,0,0],[511.2,761.12,"Tb4",-1,0,0,0],[482.8,738.4,"Tb2",-2,0,0,0],[460.08,721.36,"Tb1",-3,0,0,0],[437.36,687.28,"TS2",-3,0,0,0],[431.68,658.88,"TS1",-4,0,0,0],[499.84,545.28,"Δ4",-4,0,0,0],[477.12,568,"Δ3",-4,0,0,0],[550.96,238.56,"F1",-4,0,0,0],[568,266.96,"F2",-4,0,0,0],[562.32,301.04,"F3",-4,0,0,0],[550.96,335.12,"F4",-4,0,0,0],[539.6,369.2,"F5",-4,0,0,0],[408.96,522.56,"Q2",-4,0,0,0],[437.36,499.84,"Q1",-4,0,0,0],[460.08,477.12,"S2",-4,0,0,0],[482.8,448.72,"S1",-4,0,0,0],[505.52,426,"Cy2",-4,0,0,0],[522.56,397.6,"Cy1",-4,0,0,0],[636.16,727.04,"AS4",18,0,0,0],[607.76,749.76,"AS2",18,0,0,0],[658.88,704.32,"AS3",18,0,0,0],[590.72,45.44,"P4",-2,0,0,0],[590.72,45.44,"Flag Change",-8,-4,0,1]],[[56.8,56.8,"(B2.5) For animation only"]],[],[],["(B2.5) For animation only",60,0,8]],[[[556.64,499.84,"P3",14,0,0,0],[568,573.68,"P2",-2,0,0,0],[545.28,624.8,"P1",-2,0,0,0],[408.96,590.72,"P5",-2,0,0,0],[443.04,613.44,"P7",-2,0,0,0],[482.8,630.48,"P6",-2,0,0,0],[318.08,465.76,"BD1",12,-3,0,0],[318.08,488.48,"BD2",12,-3,0,0],[318.08,533.92,"BD4",12,-3,0,0],[318.08,511.2,"BD3",12,-3,0,0],[545.28,658.88,"T6",1,1,0,0],[585.04,641.84,"T4",1,1,0,0],[568,653.2,"T5",1,1,0,0],[602.08,624.8,"T3",2,2,0,0],[619.12,607.76,"T2",2,2,0,0],[636.16,590.72,"T1",2,2,0,0],[499.84,454.4,"M1",-4,0,0,0],[511.2,272.64,"C8",-10,-2,0,0],[454.4,664.56,"AS1",0,0,0,0],[499.84,545.28,"Δ1",-4,0,0,0],[499.84,522.56,"Δ2",-4,0,0,0],[431.68,658.88,"Tb3",-1,-1,0,0],[408.96,647.52,"Tb4",-1,-1,0,0],[352.16,607.76,"TS2",-2,-2,0,0],[335.12,590.72,"TS1",-2,-2,0,0],[499.84,477.12,"Δ4",-4,0,0,0],[499.84,499.84,"Δ3",-4,0,0,0],[386.24,295.36,"F1",-6,0,0,0],[363.52,306.72,"F2",-6,0,0,0],[346.48,323.76,"F3",-5,0,0,0],[329.44,340.8,"F4",-4,0,0,0],[318.08,363.52,"F5",-4,0,0,0],[363.52,556.64,"Q2",-4,-3,0,0],[363.52,533.92,"Q1",-4,-3,0,0],[363.52,511.2,"S2",-4,-3,0,0],[363.52,488.48,"S1",-4,-3,0,0],[363.52,465.76,"Cy2",-4,-3,0,0],[363.52,443.04,"Cy1",-4,-3,0,0],[499.84,670.24,"AS4",16,0,0,0],[477.12,670.24,"AS2",16,0,0,0],[522.56,664.56,"AS3",16,0,0,0],[454.4,227.2,"P4",-2,0,0,0],[533.92,295.36,"C7",-10,-2,0,0],[545.28,318.08,"C9",-10,-2,0,0],[550.96,335.12,"C6",-11,-3,0,0],[562.32,352.16,"C10",-11,-3,0,0],[573.68,374.88,"C5",-11,-3,0,0],[579.36,397.6,"C11",-12,-4,0,0],[585.04,420.32,"C4",-12,-4,0,0],[590.72,443.04,"C3",-12,-4,0,0],[596.4,465.76,"C2",-12,-4,0,0],[590.72,488.48,"C1",-12,-4,0,0],[369.2,619.12,"Tb1",-1,-1,0,0],[391.92,636.16,"Tb2",-1,-1,0,0]],[[56.8,56.8,"(B3) Circle Hallway Set"],[56.8,454.4,"MM 13-15"]],[[119.28,56.8,"Move 12 counts / 24 steps"]],[],["(B3) Circle Hallway Set",60,0,12]],[[[465.76,426,"P3",11,0,0,0],[499.84,499.84,"P2",0,0,0,0],[460.08,585.04,"P1",-2,0,0,0],[329.44,460.08,"P5",-2,0,0,0],[323.76,533.92,"P7",-6,0,0,0],[380.56,585.04,"P6",-5,0,0,0],[471.44,619.12,"T6",1,1,0,0],[511.2,585.04,"T4",1,1,0,0],[494.16,607.76,"T5",1,1,0,0],[528.24,568,"T3",2,2,0,0],[539.6,539.6,"T2",3,3,0,0],[545.28,511.2,"T1",3,3,0,0],[431.68,454.4,"M1",-12,0,0,0],[340.8,380.56,"C8",-7,0,0,0],[369.2,630.48,"AS1",0,0,0,0],[431.68,545.28,"Δ1",4,0,0,0],[431.68,522.56,"Δ2",-12,0,0,0],[340.8,619.12,"Tb3",-1,-1,0,0],[318.08,602.08,"Tb4",-1,-1,0,0],[278.32,533.92,"TS2",-2,-2,0,0],[272.64,511.2,"TS1",-2,-2,0,0],[431.68,477.12,"Δ4",-12,0,0,0],[431.68,499.84,"Δ3",-12,0,0,0],[318.08,397.6,"F1",-6,0,0,0],[301.04,414.64,"F2",-6,0,0,0],[289.68,437.36,"F3",-5,0,0,0],[278.32,465.76,"F4",-4,0,0,0],[272.64,488.48,"F5",-4,0,0,0],[408.96,556.64,"Q2",-4,0,1,0],[408.96,533.92,"Q1",-4,0,1,0],[408.96,511.2,"S2",-4,0,1,0],[408.96,488.48,"S1",-4,0,1,0],[408.96,465.76,"Cy2",-4,0,1,0],[408.96,443.04,"Cy1",-4,0,1,0],[420.32,636.16,"AS4",16,0,0,0],[391.92,636.16,"AS2",16,0,0,0],[448.72,630.48,"AS3",16,0,0,0],[391.92,414.64,"P4",-4,0,0,0],[363.52,369.2,"C7",-8,0,0,0],[391.92,363.52,"C9",-8,0,0,0],[420.32,363.52,"C6",-8,0,0,0],[448.72,369.2,"C10",-9,0,0,0],[471.44,380.56,"C5",-9,-1,0,0],[494.16,397.6,"C11",-9,-1,0,0],[511.2,408.96,"C4",-10,-2,0,0],[528.24,431.68,"C3",-11,-3,0,0],[539.6,460.08,"C2",-11,-3,0,0],[545.28,488.48,"C1",-12,-4,0,0],[289.68,562.32,"Tb1",-2,-2,0,0],[301.04,585.04,"Tb2",-1,-1,0,0],[386.24,465.76,"BD1",12,0,0,0],[386.24,488.48,"BD2",12,-3,1,0],[386.24,511.2,"BD3",12,-3,1,0],[386.24,533.92,"BD4",12,0,0,0]],[[56.8,56.8,"(B4) Sun Burst"],[56.8,318.08,"MM 16-18"]],[[119.28,56.8,"Move 12 counts / 12 steps"]],[[1,[323.76,533.92],[329.44,494.16],[340.8,454.4],[374.88,426],[414.64,408.96],[454.4,408.96],[488.48,420.32],[505.52,443.04],[522.56,471.44],[528.24,499.84],[528.24,533.92],[522.56,568],[511.2,590.72],[482.8,607.76],[448.72,613.44],[431.68,607.76],[408.96,596.4],[391.92,573.68],[380.56,550.96],[374.88,528.24],[374.88,499.84],[380.56,471.44],[391.92,448.72],[408.96,431.68],[437.36,414.64],[465.76,403.28],[499.84,397.6],[533.92,397.6],[562.32,408.96],[590.72,437.36],[607.76,465.76],[613.44,499.84]],[1,[329.44,460.08],[380.56,426],[414.64,414.64],[454.4,414.64],[482.8,426],[499.84,448.72],[511.2,471.44],[516.88,499.84],[516.88,533.92],[511.2,568],[499.84,596.4],[471.44,607.76],[443.04,607.76],[420.32,602.08],[403.28,590.72],[386.24,573.68],[374.88,556.64],[363.52,528.24],[363.52,499.84],[369.2,471.44],[380.56,448.72],[403.28,426],[431.68,414.64],[460.08,408.96],[488.48,403.28],[516.88,403.28],[545.28,414.64],[568,437.36],[585.04,465.76],[590.72,499.84],[590.72,533.92],[579.36,562.32],[562.32,590.72]],[1,[391.92,414.64],[414.64,414.64],[454.4,420.32],[477.12,431.68],[488.48,448.72],[499.84,471.44],[505.52,499.84],[499.84,533.92],[494.16,568],[482.8,590.72],[465.76,596.4],[443.04,602.08],[420.32,596.4],[397.6,585.04],[374.88,568],[363.52,550.96],[357.84,528.24],[357.84,499.84],[363.52,465.76],[380.56,437.36],[403.28,420.32],[431.68,408.96],[465.76,403.28],[499.84,403.28],[528.24,408.96],[550.96,426],[562.32,448.72],[573.68,477.12],[579.36,499.84],[579.36,533.92],[568,562.32],[545.28,585.04],[511.2,602.08],[471.44,613.44]],[1,[465.76,426],[477.12,443.04],[488.48,471.44],[494.16,499.84],[494.16,528.24],[488.48,562.32],[482.8,579.36],[471.44,590.72],[454.4,596.4],[426,596.4],[403.28,596.4],[386.24,585.04],[363.52,562.32],[352.16,533.92],[352.16,494.16],[352.16,471.44],[374.88,431.68],[397.6,408.96],[431.68,397.6],[460.08,397.6],[499.84,403.28],[545.28,431.68],[556.64,454.4],[568,488.48],[568,516.88],[562.32,545.28],[545.28,579.36],[528.24,596.4],[499.84,607.76],[477.12,613.44],[454.4,607.76],[426,590.72],[408.96,568],[403.28,545.28]],[1,[499.84,499.84],[494.16,539.6],[488.48,550.96],[477.12,568],[465.76,579.36],[443.04,590.72],[426,590.72],[397.6,585.04],[374.88,568],[363.52,539.6],[357.84,511.2],[363.52,471.44],[374.88,443.04],[403.28,420.32],[437.36,408.96],[465.76,403.28],[505.52,408.96],[539.6,437.36],[556.64,471.44],[562.32,511.2],[556.64,545.28],[539.6,573.68],[516.88,596.4],[494.16,602.08],[465.76,602.08],[443.04,596.4],[408.96,579.36],[391.92,556.64],[386.24,528.24],[386.24,488.48],[397.6,454.4]],[1,[460.08,585.04],[420.32,596.4],[386.24,590.72],[352.16,562.32],[346.48,533.92],[346.48,494.16],[352.16,460.08],[363.52,443.04],[386.24,426],[408.96,414.64],[443.04,408.96],[471.44,408.96],[499.84,414.64],[516.88,426],[533.92,443.04],[545.28,465.76],[550.96,494.16],[550.96,528.24],[539.6,556.64],[522.56,579.36],[505.52,590.72],[482.8,602.08],[454.4,607.76],[437.36,607.76],[403.28,590.72],[391.92,573.68],[380.56,545.28],[374.88,511.2],[374.88,488.48],[380.56,460.08],[391.92,437.36],[414.64,414.64],[443.04,397.6],[471.44,391.92]],[1,[380.56,585.04],[357.84,568],[346.48,550.96],[340.8,516.88],[340.8,482.8],[352.16,448.72],[369.2,426],[391.92,408.96],[414.64,403.28],[443.04,403.28],[471.44,408.96],[499.84,420.32],[516.88,437.36],[528.24,454.4],[533.92,471.44],[539.6,494.16],[539.6,516.88],[533.92,545.28],[516.88,573.68],[499.84,590.72],[471.44,602.08],[443.04,602.08],[414.64,590.72],[397.6,573.68],[380.56,550.96],[369.2,516.88],[369.2,488.48],[380.56,448.72],[397.6,420.32],[431.68,391.92],[471.44,380.56],[505.52,380.56],[533.92,386.24],[562.32,408.96]]],["(B4) Sun Burst",60,0,12]],[[[403.28,545.28,"P3",9,0,0,0],[397.6,454.4,"P2",0,0,0,0],[471.44,391.92,"P1",-2,0,0,0],[562.32,590.72,"P5",-2,0,0,0],[613.44,499.84,"P7",-6,0,0,0],[562.32,408.96,"P6",-5,0,0,0],[585.04,658.88,"T6",1,1,0,0],[636.16,613.44,"T4",1,1,0,0],[613.44,636.16,"T5",1,1,0,0],[653.2,585.04,"T3",2,2,0,0],[670.24,556.64,"T2",3,3,0,0],[675.92,522.56,"T1",3,3,0,0],[522.56,454.4,"M1",-12,0,0,0],[414.64,340.8,"C8",-7,0,0,0],[448.72,675.92,"AS1",0,0,0,0],[522.56,545.28,"Δ1",4,0,0,0],[522.56,522.56,"Δ2",-12,0,0,0],[414.64,658.88,"Tb3",-1,-1,0,0],[380.56,636.16,"Tb4",-1,-1,0,0],[329.44,545.28,"TS2",-2,-2,0,0],[318.08,516.88,"TS1",-2,-2,0,0],[522.56,477.12,"Δ4",-12,0,0,0],[522.56,499.84,"Δ3",-12,0,0,0],[380.56,363.52,"F1",-6,0,0,0],[357.84,391.92,"F2",-6,0,0,0],[340.8,420.32,"F3",-5,0,0,0],[329.44,454.4,"F4",-4,0,0,0],[318.08,482.8,"F5",-4,0,0,0],[499.84,556.64,"Q2",-4,0,1,0],[499.84,533.92,"Q1",-4,0,1,0],[499.84,511.2,"S2",-4,0,1,0],[499.84,488.48,"S1",-4,0,1,0],[499.84,465.76,"Cy2",-4,0,1,0],[499.84,443.04,"Cy1",-4,0,1,0],[516.88,681.6,"AS4",16,0,0,0],[477.12,681.6,"AS2",16,0,0,0],[550.96,670.24,"AS3",17,1,0,0],[471.44,613.44,"P4",-5,0,0,0],[443.04,329.44,"C7",-8,0,0,0],[477.12,318.08,"C9",-8,0,0,0],[516.88,318.08,"C6",-8,0,0,0],[550.96,329.44,"C10",-9,0,0,0],[585.04,340.8,"C5",-9,-1,0,0],[613.44,363.52,"C11",-9,-1,0,0],[636.16,386.24,"C4",-10,-2,0,0],[653.2,414.64,"C3",-11,-3,0,0],[670.24,443.04,"C2",-11,-3,0,0],[675.92,477.12,"C1",-12,-4,0,0],[340.8,579.36,"Tb1",-2,-2,0,0],[357.84,607.76,"Tb2",-1,-1,0,0],[477.12,465.76,"BD1",12,0,0,0],[477.12,488.48,"BD2",12,-3,1,0],[477.12,511.2,"BD3",12,-3,1,0],[477.12,533.92,"BD4",12,0,0,0]],[[56.8,56.8,"(B5) Sun Burst 2"],[56.8,340.8,"MM 19-20"]],[[119.28,56.8,"Move 8 counts / 8 steps"]],[],["(B5) Sun Burst 2",60,0,8]],[[[545.28,658.88,"P3",8,0,0,0],[545.28,340.8,"P2",0,0,0,0],[613.44,363.52,"P1",-2,0,0,0],[658.88,568,"P5",-2,0,0,0],[681.6,499.84,"P7",-6,0,0,0],[658.88,431.68,"P6",-5,0,0,0],[619.12,721.36,"T6",1,1,0,0],[675.92,687.28,"T4",1,1,0,0],[647.52,704.32,"T5",1,1,0,0],[698.64,664.56,"T3",2,2,0,0],[715.68,624.8,"T2",3,3,0,0],[727.04,590.72,"T1",12,0,0,0],[590.72,454.4,"M1",-12,0,0,0],[454.4,318.08,"C8",-7,0,0,0],[482.8,704.32,"AS1",0,0,0,0],[590.72,545.28,"Δ1",4,0,0,0],[602.08,522.56,"Δ2",-12,0,0,0],[454.4,687.28,"Tb3",-1,-1,0,0],[437.36,653.2,"Tb4",-1,-1,0,0],[408.96,550.96,"TS2",-3,-3,0,0],[408.96,522.56,"TS1",-3,-3,0,0],[602.08,477.12,"Δ4",-12,0,0,0],[613.44,499.84,"Δ3",-12,0,0,0],[437.36,346.48,"F1",-6,0,0,0],[426,380.56,"F2",-6,0,0,0],[408.96,420.32,"F3",-5,0,0,0],[408.96,448.72,"F4",-4,0,0,0],[408.96,477.12,"F5",-4,0,0,0],[556.64,556.64,"Q2",-1,0,0,0],[568,533.92,"Q1",-4,0,1,0],[579.36,511.2,"S2",-4,0,1,0],[579.36,488.48,"S1",-4,0,1,0],[568,465.76,"Cy2",-4,0,1,0],[556.64,443.04,"Cy1",-7,0,0,0],[550.96,732.72,"AS4",16,0,0,0],[516.88,721.36,"AS2",16,0,0,0],[585.04,732.72,"AS3",16,0,0,0],[613.44,636.16,"P4",-5,0,0,0],[482.8,301.04,"C7",-8,0,0,0],[516.88,284,"C9",-8,0,0,0],[550.96,278.32,"C6",-8,0,0,0],[585.04,278.32,"C10",-9,0,0,0],[619.12,289.68,"C5",-9,-1,0,0],[647.52,301.04,"C11",-9,-1,0,0],[675.92,323.76,"C4",-10,-2,0,0],[698.64,346.48,"C3",-11,-3,0,0],[715.68,374.88,"C2",-11,-3,0,0],[727.04,408.96,"C1",-4,0,0,0],[408.96,579.36,"Tb1",-2,-2,0,0],[420.32,619.12,"Tb2",-1,-1,0,0],[533.92,454.4,"BD1",12,0,0,0],[556.64,477.12,"BD2",12,-3,1,0],[556.64,522.56,"BD3",12,-3,1,0],[533.92,545.28,"BD4",12,0,0,0]],[[56.8,56.8,"(B6) Impact Arc"],[56.8,329.44,"MM 21-23"]],[[119.28,56.8,"Hold 4 counts / 8 steps"],[164.72,56.8,"Move 8 counts / 16 steps"]],[],["(B6) Impact Arc",60,4,8]],[[[727.04,499.84,"P3",12,0,0,0],[727.04,408.96,"P2",-4,0,0,0],[590.72,454.4,"P1",-2,0,0,0],[727.04,465.76,"P5",-4,0,0,0],[727.04,443.04,"P7",-4,0,0,0],[727.04,426,"P6",-4,0,0,0],[692.96,681.6,"T2",0,0,0,0],[545.28,590.72,"M1",-16,0,0,0],[420.32,681.6,"AS1",0,0,0,0],[408.96,613.44,"Tb3",-4,-3,0,0],[408.96,590.72,"Tb4",-4,-3,0,0],[318.08,590.72,"TS2",0,0,0,0],[340.8,590.72,"TS1",0,0,0,0],[363.52,363.52,"F1",-4,0,0,0],[363.52,386.24,"F2",-4,0,0,0],[363.52,408.96,"F3",-4,0,0,0],[363.52,431.68,"F4",-4,0,0,0],[363.52,454.4,"F5",-4,0,0,0],[454.4,522.56,"Q2",-4,0,0,0],[454.4,499.84,"Q1",-4,0,0,0],[454.4,477.12,"S2",-4,0,0,0],[454.4,454.4,"S1",-4,0,0,0],[454.4,431.68,"Cy2",-4,-3,0,0],[454.4,408.96,"Cy1",-4,-3,0,0],[488.48,681.6,"AS4",16,0,0,0],[454.4,681.6,"AS2",16,0,0,0],[522.56,681.6,"AS3",16,0,0,0],[727.04,482.8,"P4",-4,0,0,0],[704.32,318.08,"C2",-16,0,0,0],[727.04,318.08,"C1",0,0,0,0],[408.96,545.28,"Tb1",-4,-3,0,0],[408.96,568,"Tb2",-4,-3,0,0],[454.4,318.08,"BD1",12,-3,0,0],[454.4,340.8,"BD2",12,-3,0,0],[454.4,363.52,"BD3",12,-3,0,0],[454.4,386.24,"BD4",12,-3,0,0],[681.6,318.08,"C3",-16,0,0,0],[658.88,318.08,"C4",-16,0,0,0],[636.16,318.08,"C11",-16,0,0,0],[613.44,318.08,"C5",-16,0,0,0],[590.72,318.08,"C10",-16,0,0,0],[568,318.08,"C6",-16,0,0,0],[545.28,318.08,"C9",-16,0,0,0],[522.56,318.08,"C7",-16,0,0,0],[499.84,318.08,"C8",-16,0,0,0],[568,590.72,"Δ4",-16,0,0,0],[590.72,590.72,"Δ3",-16,0,0,0],[613.44,590.72,"Δ2",-16,0,0,0],[636.16,590.72,"Δ1",-16,0,0,0],[727.04,681.6,"T1",0,0,0,0],[658.88,681.6,"T3",0,0,0,0],[624.8,681.6,"T4",0,0,0,0],[590.72,681.6,"T5",0,0,0,0],[556.64,681.6,"T6",0,0,0,0]],[[56.8,56.8,"(B7) M Build"],[56.8,284,"MM 24-25"]],[[119.28,56.8,"Move 7 counts / 14 steps"]],[],["(B7) M Build",60,0,7]],[[[607.76,454.4,"P3",13,0,0,0],[681.6,408.96,"P2",-3,0,0,0],[727.04,454.4,"P1",-4,0,0,0],[681.6,590.72,"P5",-3,0,0,0],[539.6,653.2,"P7",-2,0,0,0],[607.76,619.12,"P6",-3,0,0,0],[647.52,653.2,"T2",0,0,0,0],[482.8,658.88,"Tb4",-20,-3,0,0],[397.6,761.12,"AS1",0,0,0,0],[454.4,681.6,"Tb3",-4,-3,0,0],[545.28,579.36,"M1",-3,0,0,0],[380.56,749.76,"TS2",-4,-3,0,0],[363.52,772.48,"TS1",-4,-3,0,0],[443.04,505.52,"F1",-6,0,0,0],[414.64,516.88,"F2",-6,0,0,0],[380.56,533.92,"F3",-6,0,0,0],[420.32,539.6,"F4",-2,0,0,0],[454.4,539.6,"F5",-2,0,0,0],[408.96,408.96,"Q2",-4,0,0,0],[391.92,386.24,"Q1",-4,0,0,0],[380.56,363.52,"S2",-4,0,0,0],[391.92,340.8,"S1",-4,0,0,0],[408.96,318.08,"Cy2",-4,-3,0,0],[426,295.36,"Cy1",-4,-3,0,0],[460.08,738.4,"AS4",16,0,0,0],[426,755.44,"AS2",16,0,0,0],[494.16,721.36,"AS3",16,0,0,0],[539.6,499.84,"P4",-3,0,0,0],[710,301.04,"C2",-22,0,0,0],[727.04,272.64,"C1",-6,0,0,0],[408.96,727.04,"Tb1",-4,-3,0,0],[431.68,704.32,"Tb2",-4,-3,0,0],[391.92,204.48,"BD1",12,-3,0,0],[408.96,227.2,"BD2",12,-3,0,0],[426,249.92,"BD3",12,-3,0,0],[437.36,272.64,"BD4",12,-3,0,0],[687.28,323.76,"C3",-22,0,0,0],[658.88,346.48,"C4",-22,0,0,0],[505.52,641.84,"Δ3",-21,0,0,0],[528.24,619.12,"Δ4",-21,0,0,0],[522.56,550.96,"Δ2",-18,0,0,0],[494.16,539.6,"Δ1",-18,0,0,0],[675.92,641.84,"T1",0,0,0,0],[613.44,670.24,"T3",0,0,0,0],[585.04,681.6,"T4",0,0,0,0],[550.96,698.64,"T5",0,0,0,0],[516.88,710,"T6",0,0,0,0],[636.16,369.2,"C11",-22,0,0,0],[607.76,391.92,"C5",-22,0,0,0],[585.04,408.96,"C10",-22,0,0,0],[556.64,431.68,"C6",-22,0,0,0],[522.56,454.4,"C9",-22,0,0,0],[499.84,471.44,"C7",-22,0,0,0],[471.44,488.48,"C8",-22,0,0,0]],[[56.8,56.8,"(C1) \"M\" is for Malagueña"],[56.8,488.48,"MM 1"]],[[119.28,56.8,"Move 4 Counts"]],[],["(C1) \"M\" is for Malagueña",60,0,7]]]
let playing = false;
let offset = 0;
let tool = "p";

updateControls(false);
loadPage(pageData[page])

window.onbeforeprint = () => {
  query("#controls").style.display = "none";
  document.title = query("#pageName").value;
}

window.onafterprint = () => {
  query("#controls").style.display = "inline";
  document.title = "Marching Band Drill Maker | AP-Study";
}

function round(val) {
  return Math.round(val/5.68)*5.68;
}

function loadPage(data) {
  queryA(".dotContainer").forEach(elmnt => {
    elmnt.remove();
  })
  queryA(".title").forEach(elmnt => {
    elmnt.remove();
  })
  queryA(".text-label").forEach(elmnt => {
    elmnt.remove();
  })
  queryA(".pathContainer").forEach(elmnt => {
    elmnt.remove();
  })
  data[0].forEach(elmnt => {
    container.insertAdjacentHTML("beforeend",
      `<div class="dotContainer${elmnt[6] ? " toAnimate" : ""}" style="top: ${elmnt[0]}px; left: ${elmnt[1]}px;">
        <div class="dot"></div>
        <div class="label${elmnt[5] ? " hidden" : ""}" style="--position: ${elmnt[3]}; --rotation: ${elmnt[4]}">
          <span class="input">${elmnt[2]}</span>
        </div>`
  );
  })
  data[1].forEach(elmnt => {
    container.insertAdjacentHTML("beforeend",
    `<p class="title" style="top: ${elmnt[0]}px; left: ${elmnt[1]}px;">${elmnt[2]}</p>`
    )
  })
  data[2].forEach(elmnt => {
    container.insertAdjacentHTML("beforeend",
    `<p class="text-label" style="top: ${elmnt[0]}px; left: ${elmnt[1]}px;">${elmnt[2]}</p>`
    )
  })
}

function prevPage() {
  page--;
  loadPage(pageData[page]);
  updateControls(false)
}

function nextPage(save = true) {
  page++
  loadPage(pageData[page]);
  updateControls(false)
}

function query(val) {
  return document.querySelector(val);
}

function queryA(val) {
  return document.querySelectorAll(val);
}

let timeout;

function handlePlay() {
  if (playing) {
    query("#play-btn").textContent = "▶";
    playing = false;
    page--;
    loadPage(pageData[page]);
    clearTimeout(timeout);
    updateControls(false);
    return;
  }

  if (page + 1 === pageData.length) return;
  query("#play-btn").textContent = "⏹";
  playing = true;
  animate();
}

function startAnimation(paths, holdTime, moveTime) {
  queryA(".dotContainer").forEach(elmnt => {
    elmnt.remove();
  })
  queryA(".title").forEach(elmnt => {
    elmnt.remove();
  })
  queryA(".text-label").forEach(elmnt => {
    elmnt.remove();
  })
  queryA(".pathContainer").forEach(elmnt => {
    elmnt.remove();
  })
  
  const curPage = pageData[page][0];
  const nextPage = pageData[page + 1][0];
  curPage.forEach(curDot => {
    if (curDot[6] === 1) return;
    const nextDot = nextPage.find(nextItem => nextItem[6] === 0 && curDot[2] === nextItem[2]);
    if (nextDot) {
      container.insertAdjacentHTML("beforeend",
        `<div class="dotContainer animated" style="top: ${nextDot[0]}px; left: ${nextDot[1]}px;"><div class="dot"></div>`
      );

      const dot = container.lastElementChild;
      let startIdx = -1;
      let endIdx = -1;
      
      const path = paths.find(tempPath => {
        startIdx = tempPath.findIndex((pathDot, idx) =>
          idx !== 0 && curDot[0] === pathDot[0] && curDot[1] === pathDot[1]
        );
        if (startIdx !== -1) {
          endIdx = tempPath.findLastIndex((pathDot, idx) =>
            idx > startIdx && nextDot[0] === pathDot[0] && nextDot[1] === pathDot[1]
          );
        }
        return endIdx !== -1;
      })

      const animation = [
        {translate: `${curDot[1] - nextDot[1]}px ${curDot[0] - nextDot[0]}px`},
        {translate: `${curDot[1] - nextDot[1]}px ${curDot[0] - nextDot[0]}px`,
        offset: holdTime / (holdTime + moveTime)}
      ]

      if (startIdx !== -1 && endIdx !== -1) {
        let curOffset = holdTime / (holdTime + moveTime);
        let totalLength = 0;
        for (let i = startIdx; i < endIdx; i++) {
          totalLength += dist(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
        }
        for (let i = startIdx + 1; i < endIdx; i++) {
          if (path[0] === 1) {
            curOffset += moveTime/(holdTime + moveTime)*dist(path[i][0], path[i][1], path[i - 1][0], path[i - 1][1])/totalLength;
          } else {
            curOffset += moveTime/(holdTime + moveTime)/(endIdx-startIdx)
          }
          animation.push({
            translate: `${path[i][1] - nextDot[1]}px ${path[i][0] - nextDot[0]}px`,
            offset: curOffset
          })
        }
      }
      
      animation.push({translate: '0 0'});
      dot.animate(animation, holdTime + moveTime)
    }
  })
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function animate() {
  if (page + 1 === pageData.length) {
    query("#play-btn").textContent = "▶";
    playing = false;
    loadPage(pageData[page]);
    updateControls(false);
    return;
  }
  updateControls(true);
  const holdTime = 60/pageData[page][4][1]*pageData[page][4][2]*1000;
  const moveTime = 60/pageData[page][4][1]*pageData[page][4][3]*1000;
  startAnimation(pageData[page][3], holdTime, moveTime);
  timeout = setTimeout(animate, holdTime + moveTime);
  page++;
}

function updateData(data, version, pageOnly = false) {
  if (pageOnly) {
    switch(version) {
      case 0: {
        data[3] = [data[3][0], 0, data[3][1]]
      }
      case 1: {
        data[0].forEach((dot, dotIdx) => {
          data[0][dotIdx] = [parsePX(dot[0]), parsePX(dot[1]), dot[2], dot[3], dot[4]];
        })
        data[1].forEach((dot, dotIdx) => {
          data[1][dotIdx] = [parsePX(title[0]), parsePX(title[1]), title[2]];
        })
        data[2].forEach((dot, dotIdx) => {
          data[2][dotIdx] = [parsePX(label[0]), parsePX(label[1]), label[2]];
        })
      }
      case 2: {
        data.push(data[3]);
        data[3] = [];
      }
      case 3: {
        data[4].unshift(`Page ${page + 1}`);
      }
      case 4: {
        data[3].forEach((path) => {path.unshift(0)});
      }
      case 5: {
        data[0].forEach((dot, dotIdx) => {
          data[0][dotIdx].push(0)
        })
      }
      case 6: {
        data[0].forEach((dot, dotIdx) => {
          data[0][dotIdx].push(0)
        })
      }
    }
  } else {
    switch(version) {
      case 0: {
        data.forEach((page, idx) => {
          data[idx][3] = [page[3][0],0,page[3][1]]
        })
      }
      case 1: {
        data.forEach((page, idx) => {
          page[0].forEach((dot, dotIdx) => {
            data[idx][0][dotIdx] = [parsePX(dot[0]), parsePX(dot[1]), dot[2], dot[3], dot[4]]
          })
          page[1].forEach((title, titleIdx) => {
            data[idx][1][titleIdx] = [parsePX(title[0]), parsePX(title[1]), title[2]]
          })
          page[2].forEach((label, labelIdx) => {
            data[idx][2][labelIdx] = [parsePX(label[0]), parsePX(label[1]), label[2]]
          })
        })
      }
      case 2: {
        data.forEach((page, idx) => {
          data[idx].push(page[3]);
          data[idx][3] = [];
        })
      }
      case 3: {
        data.forEach((page, idx) => {
          data[idx][4].unshift(`Page ${idx + 1}`)
        })
      }
      case 4: {
        data.forEach((page, idx) => {
          page[3].forEach((path, pathIdx) => {
            data[idx][3][pathIdx].unshift(0);
          })
        })
      }
      case 5: {
        data.forEach((page, idx) => {
          page[0].forEach((dot, dotIdx) => {
            data[idx][0][dotIdx].push(0)
          })
        })
      }
      case 6: {
        data.forEach((page, idx) => {
          page[0].forEach((dot, dotIdx) => {
            data[idx][0][dotIdx].push(0)
          })
        })
      }
    }
  }
  return data;
}

function parsePX(px) {
  return parseFloat(px.replace("px", ""))
}

function updateControls(disabled) {
  if (disabled) {
    next.disabled = true;
    prev.disabled = true;
  } else {
    next.disabled = (page + 1) === pageData.length;
    prev.disabled = page === 0;
  }
  query("#play-btn").disabled = page === pageData.length - 1;
}