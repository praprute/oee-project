import homepage from './components/homepage.vue'
import ready from './components/p2.vue'
import running from './components/p3.vue'
import defect from './components/p4.vue'
import downtime from './components/p5.vue'
import checkstatus from './components/checkstatus.vue'
import Downtime2 from './components/Downtime2.vue'

export const routes = [{
    path: "/",
    component: checkstatus
}, 
{
    path: "/ready",
    component: ready
}, {
    path: "/running",
    component: running
}, {
    path: "/defect",
    component: defect
}, {
    path: "/downtime",
    component: downtime
},{
    path: "/home",
    component: homepage
},
{
    path:"/Downtime2",
    component:Downtime2

},]