/*=================================aniket_v=================================*/
#include<bits/stdc++.h>
using namespace std;
#define gc getchar_unlocked
#define fo(i,n) for(i=0;i<n;i++)
#define Fo(i,k,n) for(i=k;k<n?i<n:i>n;k<n?i+=1:i-=1)
#define ll long long
#define si(x)	cin>>x
#define pin(x)	cout<<x<<endl
#define pi(x)	cout<<x<<" "
#define deb(x) cout << #x << "=" << x << endl
#define deb2(x, y) cout << #x << "=" << x << "," << #y << "=" << y << endl
#define pb push_back
#define mp make_pair
#define F first
#define S second
#define all(x) x.begin(), x.end()
#define clr(x) memset(x, 0, sizeof(x))
#define sortall(x) sort(all(x))
#define tr(it, a) for(auto it = a.begin(); it != a.end(); it++)
#define PI 3.1415926535897932384626
typedef pair<int, int>	pii;
typedef pair<ll, ll>	pl;
typedef vector<int>		vi;
typedef vector<ll>		vl;
typedef vector<pii>		vpii;
typedef vector<pl>		vpl;
typedef vector<vi>		vvi;
typedef vector<vl>		vvl;
mt19937_64 rang(chrono::high_resolution_clock::now().time_since_epoch().count());
int rng(int lim) {
    uniform_int_distribution<int> uid(0,lim-1);
    return uid(rang);
}
int mpow(int base, int exp); 
const int mod = 1'000'000'007;
const int N = 3e5, M = N;
int a[N];
void solve() {
   int i, j, n,count=0;
   si(n);
   vi v(n);
   fo(i,n){
        si(v[i]);
        if(v[i]<0) count++;
   }
   fo(i,n){
       if(count>0){
           if(v[i]>0)
               v[i]=v[i]*(-1);
           count--;
       }  
       else v[i]=abs(v[i]);
   }
   int flag=0;
   Fo(i,1,n){
       if(v[i]<v[i-1]){
           flag=1;
           break;
       }
   }
   if(flag) pin("NO");
   else pin("YES");
}

int main() {
    ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
    srand(chrono::high_resolution_clock::now().time_since_epoch().count());
    int t = 1;
    cin >> t;
    while(t--) {
      solve();
    }
    return 0;
}

int mpow(int base, int exp) {
   base %= mod;
   int result = 1;
   while (exp > 0) {
       if (exp & 1) result = ((ll)result * base) % mod;
       base = ((ll)base * base) % mod;
       exp >>= 1;
   }
   return result;
}